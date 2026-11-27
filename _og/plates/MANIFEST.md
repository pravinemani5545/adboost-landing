# Generated art plates (AdBoost Health design v2)

Status of every file below: **needs owner sign-off**. Nothing here has been approved yet.

How to use them (brief section 6): decorative layers only, `alt=""`, masked at 20-40% opacity behind the hero aside or CTA band, never the LCP element. Templates fall back to a gradient when a file is missing. Each still ships as AVIF and WebP, 1920px wide, 120KB or less.

Model: Higgsfield `nano_banana_pro` at 4k (4 credits each). Loop: `seedance_2_0` 720p, 5s, no audio. Budget cap 150 credits; **spent 82.5 credits** (including retakes). Raw 4k sources and job JSON are kept outside the repo in `projects/adboost/redesign/v2/art-src/`. Scripts: `_og/plates/` (gen.mjs, encode.mjs, loop.sh, loop-encode.sh, manifest.mjs).

## Files

| Plate | Files | Size (px) | AVIF / WebP KB | Credits | Status |
|---|---|---|---|---|---|
| advertising/hub (16:9) | `/art/advertising/hub.avif`, `.webp` | 1920x1072 | 13.8 / 36.1 | 4 | needs owner sign-off |
| advertising/meta (16:9) | `/art/advertising/meta.avif`, `.webp` | 1920x1072 | 21.1 / 50.6 | 4 | needs owner sign-off |
| advertising/google (16:9) | `/art/advertising/google.avif`, `.webp` | 1920x1072 | 18.2 / 44.9 | 4 | needs owner sign-off |
| services/paid-media (16:9) | `/art/services/paid-media.avif`, `.webp` | 1920x1072 | 17.9 / 45.7 | 4 | needs owner sign-off |
| services/creative (16:9) | `/art/services/creative.avif`, `.webp` | 1920x1072 | 15.9 / 43.2 | 4 | needs owner sign-off |
| services/cro (16:9) | `/art/services/cro.avif`, `.webp` | 1920x1072 | 21 / 53.4 | 4 | needs owner sign-off |
| services/hub (16:9) | `/art/services/hub.avif`, `.webp` | 1920x1072 | 14.1 / 38.5 | 4 | needs owner sign-off |
| industries/hub (16:9) | `/art/industries/hub.avif`, `.webp` | 1920x1072 | 17.9 / 48 | 4 | needs owner sign-off |
| glossary/hub (16:9, take 2 of 2) | `/art/glossary/hub.avif`, `.webp` | 1920x1072 | 22.1 / 52.2 | 8 | needs owner sign-off |
| compare/hub (16:9) | `/art/compare/hub.avif`, `.webp` | 1920x1072 | 13.7 / 39.3 | 4 | needs owner sign-off |
| tools/hub (16:9) | `/art/tools/hub.avif`, `.webp` | 1920x1072 | 18 / 50.6 | 4 | needs owner sign-off |
| about/hub (16:9) | `/art/about/hub.avif`, `.webp` | 1920x1072 | 44.1 / 74.9 | 4 | needs owner sign-off |
| cta/night-1 (21:9) | `/art/cta/night-1.avif`, `.webp` | 1920x815 | 17.6 / 39.2 | 4 | needs owner sign-off |
| cta/night-2 (21:9) | `/art/cta/night-2.avif`, `.webp` | 1920x815 | 14.7 / 38.3 | 4 | needs owner sign-off |
| advertising/hub-loop (ambient loop for the /advertising/ hero) | `/art/advertising/hub-loop.mp4` (H.264), `hub-loop.webm` (VP9), poster `hub-loop-poster.avif`, `.webp` | 1280x720, 4.5s seamless loop, no audio | mp4 401.2, webm 86.1, poster 13.7 / 18.8 | 22.5 | needs owner sign-off |

Loop notes: generated from the `advertising/hub` still as both start and end frame, then the last 0.6s is crossfaded into the first 0.6s so it loops without a seam. Show the poster (first frame) under reduced motion, on lowpower devices and until the video can play; pause it off screen.

## Prompts

Every still prompt is `SCENE` + the tone's `STYLE` block + `RULES`, exactly as below.

**STYLE (light):** STYLE: abstract architectural still life photographed in a cool white seamless studio, backdrop and floor a soft cool white (#f6f7f9 fading to pure white). Materials: frosted glass and translucent layered acrylic sheets with crisp polished edges, matte white surfaces. The only colour accent is thin luminous lines of electric blue light (#0057ff), hairline width, used sparingly. Soft caustic light patterns refracted through the glass fall on the floor and backdrop, faintly blue tinted. Lab-clean minimal geometry, calm and precise, generous negative space. One soft diffuse key light from the upper left, gentle long shadows. High-key, low contrast, airy. Tack sharp glass edges, real light on real materials.

**STYLE (dark, CTA plates):** STYLE: abstract architectural still life photographed in a dark studio, backdrop and floor near black (#0a0a0f) with a faint deep navy falloff. Materials: smoked frosted glass and translucent layered sheets with crisp polished edges. The only colour accent is thin luminous lines of electric blue light (#0057ff), hairline width, used sparingly, with soft blue caustic reflections. Lab-clean minimal geometry, calm and precise, very generous empty dark space. Low key, quiet, premium. Tack sharp glass edges, real light on real materials.

**RULES (all):** PURELY ABSTRACT: the only things in the image are the glass forms described, the light lines, their reflections, caustics and shadows. Uninhabited. Completely free of any writing, markings, glyphs, symbols, icons, graphics, logos, numbers or watermarks; every surface is smooth and unmarked. No other objects or props of any kind. No neon, no lens flare, no bokeh balls, no warm tones, no 3D render look, no glossy plastic.

**advertising/hub** (light, 16:9): SCENE: seven thin frosted glass sheets with softly rounded corners stand upright in parallel, slightly offset in depth like the pages of a translucent file, viewed at a gentle three-quarter angle. A single thin horizontal line of electric blue light passes straight through every sheet at the same height like a scanning beam, glowing faintly where it crosses each pane. COMPOSITION: the group of sheets occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**advertising/meta** (light, 16:9): SCENE: nine thin frosted glass sheets stand upright in a gentle concave arc, fanned like an open row, each sheet slightly overlapping the next. One thin line of electric blue light runs through the sheets as a single soft, low wave that rises and falls once across the arc. COMPOSITION: the arc occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**advertising/google** (light, 16:9): SCENE: five thin frosted glass sheets lie flat and float stacked above one another with even gaps, each slightly smaller and offset back, forming a stepped translucent terrace. One thin vertical line of electric blue light drops straight down through the centre of every sheet, leaving a small soft blue glow where it passes through each pane. COMPOSITION: the stack occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**services/paid-media** (light, 16:9): SCENE: three upright frosted glass panes stand one behind another at a slight angle. Four thin parallel lines of electric blue light travel horizontally through all three panes at different heights, bending very slightly and brightening where they refract through each pane, like signals passing through filters. COMPOSITION: the panes occupy the right half of the frame and the light lines fade out softly toward the left; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**services/creative** (light, 16:9): SCENE: five tall square-cornered panels of thick frosted glass, each in a tall portrait proportion of exactly 9 wide by 16 high, stand upright in a staggered row receding in depth. Every panel is completely blank and empty, an even translucent frost with a polished edge. Only the nearest panel carries a thin outline of electric blue light along its four edges. COMPOSITION: the row occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**services/cro** (light, 16:9): SCENE: five thin frosted glass rings stand upright on their edges, aligned one behind another along a diagonal, each ring noticeably smaller than the one before it, forming a translucent tunnel that narrows into the distance. A single thin line of electric blue light runs through the exact centre of all the rings. COMPOSITION: the rings occupy the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**services/hub** (light, 16:9): SCENE: three frosted glass forms rest on a low white plinth: a tall upright slab, a flat round disc standing on its edge, and a thin ring. Three thin lines of electric blue light connect the three forms into a clean triangle, floating just above the plinth. COMPOSITION: the group occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**industries/hub** (light, 16:9): SCENE: nine identical square frosted glass tiles float in a neat grid of exactly three rows and three columns with even gaps, tilted slightly back and seen in gentle perspective. Exactly one tile, the centre tile of the right column, glows softly from within with electric blue light and has a thin blue edge; the other eight tiles are plain frosted white. COMPOSITION: the grid occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**glossary/hub** (light, 16:9): SCENE: about ten flat round frosted glass discs of slightly different diameters lie scattered on the white floor in a sparse, open arrangement, like lenses on a light table, seen from a high three-quarter angle. Hairline filaments of electric blue light run across the floor surface linking each disc to its nearest neighbours, forming a calm, flat network map. COMPOSITION: the network occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.
  Take 1 (not used, kept in art-src): SCENE: about twelve small clear frosted glass spheres of slightly different sizes rest and float at different depths, linked to their nearest neighbours by hairline filaments of electric blue light, forming a sparse, open network like a constellation. COMPOSITION: the network occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**compare/hub** (light, 16:9): SCENE: two thick frosted glass slabs of identical size stand upright side by side with a narrow gap between them. The right slab is lit softly from within with electric blue light and has a thin blue line along its edges; the left slab is plain matte frosted white. Soft caustics from both fall on the floor. COMPOSITION: the pair occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**tools/hub** (light, 16:9): SCENE: three round frosted glass discs of different sizes lie on the white floor like precision dials, each a smooth unmarked disc with a polished bevelled rim. Above each disc a single thin arc of electric blue light traces part of its circumference, like a gauge reading, each arc a different length. COMPOSITION: seen from a high three-quarter angle; the discs occupy the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**about/hub** (light, 16:9): SCENE: two tall frosted glass slabs stand on a white plinth, angled gently toward each other, with a lower translucent glass block between their bases. A thin line of electric blue light runs along the base, joining the three forms. COMPOSITION: the group occupies the right half of the frame; the left 40 percent is clean, empty, softly lit white studio space. Nothing touches the frame edges.

**cta/night-1** (dark, 21:9): SCENE: layered smoked glass sheets recede into darkness at the far left and far right edges of the frame, their edges catching thin lines of electric blue light. COMPOSITION: wide panoramic frame; the central 60 percent is calm, empty, softly graded dark space with nothing in it.

**cta/night-2** (dark, 21:9): SCENE: one long thin horizontal line of electric blue light spans the lower third of the frame, softly reflected in a glossy black floor; at the far right edge a few thin smoked glass rings stand upright and fade into darkness. COMPOSITION: wide panoramic frame; the centre and left are calm, empty, softly graded dark space.

**advertising/hub-loop** (seedance_2_0, start and end image = advertising/hub take 1): Animate this still: a soft pulse of electric blue light travels slowly along the thin horizontal light line from left to right through the glass sheets, gently brightening each pane as it passes, while the faint caustic reflections on the floor shimmer softly. The camera is locked off and completely still: no push, no pan, no zoom. Every element that is visible now is the only thing that ever appears; the glass sheets, the light line and the white studio stay exactly as they are. Calm, slow, real-time speed, 5 seconds. No on-screen text, no numbers, no captions, no watermarks. No camera movement, no scene change, no morphing, no added objects. Negative prompt: jitter, flicker, warped glass, extra sheets, text, logo, lens flare, colour shift.

## Credit ledger

| When (UTC) | Plate | Take | Credits |
|---|---|---|---|
| 2026-11-08 10:12 | advertising/hub | 1 | 4 |
| 2026-11-08 10:13 | services/paid-media | 1 | 4 |
| 2026-11-08 10:13 | services/creative | 1 | 4 |
| 2026-11-08 10:13 | advertising/google | 1 | 4 |
| 2026-11-08 10:14 | services/cro | 1 | 4 |
| 2026-11-08 10:14 | advertising/meta | 1 | 4 |
| 2026-11-08 10:14 | services/hub | 1 | 4 |
| 2026-11-08 10:14 | industries/hub | 1 | 4 |
| 2026-11-08 10:14 | compare/hub | 1 | 4 |
| 2026-11-08 10:15 | glossary/hub | 1 | 4 |
| 2026-11-08 10:15 | tools/hub | 1 | 4 |
| 2026-11-08 10:15 | about/hub | 1 | 4 |
| 2026-11-08 10:15 | cta/night-2 | 1 | 4 |
| 2026-11-08 10:16 | cta/night-1 | 1 | 4 |
| 2026-11-08 10:18 | glossary/hub | 2 | 4 |
| 2026-11-08 10:22 | advertising/hub-loop | 1 | 22.5 |
| | **Total** | | **82.5 of 150** |
