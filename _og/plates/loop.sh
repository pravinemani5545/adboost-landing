#!/bin/bash
# Ambient loop for the /advertising/ hero: Seedance 2.0 image-to-video, same still as
# start and end frame so the clip loops seamlessly. 720p, no audio.
# Output (raw): redesign/v2/art-src/advertising__hub-loop.mp4
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$(cd "$HERE/../../../redesign/v2/art-src" && pwd)"
SEED="$SRC/advertising__hub__seed-1280.jpg"
sips -s format jpeg -s formatOptions 92 -Z 1280 "$SRC/advertising__hub__t1.png" --out "$SEED" >/dev/null

MOTION="Animate this still: a soft pulse of electric blue light travels slowly along the thin horizontal light line from left to right through the glass sheets, gently brightening each pane as it passes, while the faint caustic reflections on the floor shimmer softly. The camera is locked off and completely still: no push, no pan, no zoom. Every element that is visible now is the only thing that ever appears; the glass sheets, the light line and the white studio stay exactly as they are. Calm, slow, real-time speed, 5 seconds. No on-screen text, no numbers, no captions, no watermarks. No camera movement, no scene change, no morphing, no added objects. Negative prompt: jitter, flicker, warped glass, extra sheets, text, logo, lens flare, colour shift."

if printf "%s" "$MOTION" | grep -q $'\xe2\x80\x94'; then echo "em-dash in prompt"; exit 1; fi

hf generate create seedance_2_0 --prompt "$MOTION" --start-image "$SEED" --end-image "$SEED" \
  --aspect_ratio 16:9 --resolution 720p --duration 5 --generate_audio false \
  --wait --wait-timeout 20m --json > "$SRC/advertising__hub-loop.json"
URL=$(grep -o '"result_url": *"[^"]*"' "$SRC/advertising__hub-loop.json" | head -1 | sed 's/.*"\(https[^"]*\)"/\1/')
[ -n "$URL" ] || { echo "no result url"; cat "$SRC/advertising__hub-loop.json" | head -40; exit 1; }
curl -sSL -o "$SRC/advertising__hub-loop.mp4" "$URL"
echo "saved $SRC/advertising__hub-loop.mp4"
