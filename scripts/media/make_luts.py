"""Builds the colour grades as Hald CLUT images (level 8, 512x512).

grade.png   the house grade: the picture's own colour, slightly muted (78% of its chroma),
            a soft S-curve with gently lifted blacks, and greys leaning toward the brand's
            FRAME-to-PAPER duotone so every image sits on the brand ground. Film grain goes
            over it in CSS (.grain).
accent.png  the house grade, with hues near ACCENT turned toward the accent hue (saturation is
            never raised), for shots whose own blue should read as the brand's.

The same files grade stills (ImageMagick -hald-clut) and video (ffmpeg haldclut), so stills and
videos read as one set. Shots whose source is unusually grey or vivid are matched to the set with
a saturation pre-adjustment (SAT=) in process.sh before this grade is applied.

    uv run --python 3.12 --with numpy --with pillow python scripts/media/make_luts.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

LEVEL = 8                      # Hald level: 64 steps per channel
OUT = Path(__file__).parent

FRAME = "#0b1b3f"              # where the shadow tint leans
PAPER = "#f5f3ee"              # where the highlight tint leans
ACCENT = "#0057ff"
ACCENT_SPAN = 40               # degrees either side of the accent hue that turn toward it
CHROMA_KEPT = 0.78             # how much of the original colour survives (1 = untouched)
TINT = 0.14                    # how far the greys lean toward the FRAME-to-PAPER duotone
LIFT, CONTRAST, WHITE = 0.03, 0.12, 0.97   # the tone curve: lifted blacks, gentle contrast, eased whites
CHROMA_AMP_MAX = 1.3           # dark pixels brighten under the lift; their colour follows, but only this far


def hex_rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)])


def to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


def luma(lin):
    return lin[..., 0] * 0.2126 + lin[..., 1] * 0.7152 + lin[..., 2] * 0.0722


def tone(y):
    """Soft S-curve on perceptual lightness, then lift blacks and ease whites."""
    l = np.cbrt(y)                                          # roughly perceptual
    s = l + CONTRAST * (l - 0.5) * (1 - np.abs(2 * l - 1))  # gentle contrast, flat at the ends
    s = LIFT + s * (WHITE - LIFT)                           # lifted blacks, softened whites
    return np.clip(s, 0, 1) ** 3                            # back to linear luminance


def house(lin, kept=CHROMA_KEPT, tint=TINT):
    """The picture's own colour, muted, on a toned luminance that leans a little toward the brand duotone."""
    y = luma(lin)
    target = tone(y)
    s_lin, h_lin = to_linear(hex_rgb(FRAME)), to_linear(hex_rgb(PAPER))
    ls, lh = luma(s_lin), luma(h_lin)
    u = np.clip((target - ls) / (lh - ls), 0, 1)[..., None]
    duo = s_lin * (1 - u) + h_lin * u                        # luminance-true duotone
    neutral = np.repeat(target[..., None], 3, -1)            # the same luminance, grey
    base = neutral * (1 - tint) + duo * tint
    chroma = lin - y[..., None]                              # the original colour, minus its brightness
    amp = np.minimum(np.sqrt(target / np.maximum(y, 1e-4)), CHROMA_AMP_MAX)[..., None]
    return np.clip(base + chroma * kept * amp, 0, 1)


def rgb_to_hsv(c):
    mx, mn = c.max(-1), c.min(-1)
    d = mx - mn
    h = np.zeros_like(mx)
    r, g, b = c[..., 0], c[..., 1], c[..., 2]
    nz = d > 1e-6
    rm = nz & (mx == r)
    gm = nz & (mx == g) & ~rm
    bm = nz & ~rm & ~gm
    h[rm] = ((g - b)[rm] / d[rm]) % 6
    h[gm] = (b - r)[gm] / d[gm] + 2
    h[bm] = (r - g)[bm] / d[bm] + 4
    h = h * 60
    s = np.where(mx > 1e-6, d / np.maximum(mx, 1e-6), 0)
    return h, s, mx


def hsv_to_rgb(h, s, v):
    h = (h % 360) / 60
    i = np.floor(h).astype(int) % 6
    f = h - np.floor(h)
    p, q, t = v * (1 - s), v * (1 - s * f), v * (1 - s * (1 - f))
    choices = [
        np.stack([v, t, p], -1), np.stack([q, v, p], -1), np.stack([p, v, t], -1),
        np.stack([p, q, v], -1), np.stack([t, p, v], -1), np.stack([v, p, q], -1),
    ]
    out = np.zeros(h.shape + (3,))
    for k in range(6):
        out[i == k] = choices[k][i == k]
    return out


def accent(srgb):
    """Hues within ACCENT_SPAN of the accent turn toward it; saturation and value keep the house grade."""
    graded = to_srgb(house(to_linear(srgb)))
    gh, gs, gv = rgb_to_hsv(graded)
    ah = rgb_to_hsv(hex_rgb(ACCENT)[None, :])[0][0]
    dist = np.abs((rgb_to_hsv(srgb)[0] - ah + 180) % 360 - 180)
    w = np.clip(1 - dist / ACCENT_SPAN, 0, 1) * np.clip(gs * 3, 0, 1)
    dh = (ah - gh + 180) % 360 - 180
    return hsv_to_rgb(gh + dh * w * 0.7, gs, gv)


def hald_identity(level):
    n = level * level                                 # steps per channel
    size = level ** 3                                 # image is size x size
    idx = np.arange(size * size)
    r = idx % n
    g = (idx // n) % n
    b = idx // (n * n)
    rgb = np.stack([r, g, b], -1) / (n - 1)
    return rgb.reshape(size, size, 3)


def save(rgb, name):
    Image.fromarray((np.clip(rgb, 0, 1) * 255 + 0.5).astype(np.uint8)).save(OUT / name)
    print("wrote", OUT / name)


if __name__ == "__main__":
    ident = hald_identity(LEVEL)
    save(to_srgb(house(to_linear(ident))), "grade.png")
    save(accent(ident), "accent.png")
