#!/bin/bash
# Turn the raw Seedance clip into a seamless loop and web deliverables:
# crossfade the last 0.6s into the first 0.6s (so the end frame equals the start frame),
# then encode 720p H.264 mp4 + VP9 webm (no audio, each <= 1.5MB) and a poster
# (the loop's first frame) as AVIF + WebP, 256px wide like the hero plates, so the poster is
# never the LCP element (the video fades in over it once it plays).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
SRC="$(cd "$ROOT/../redesign/v2/art-src" && pwd)/advertising__hub-loop.mp4"
OUT="$ROOT/public/art/advertising"
TMP="$(mktemp -d)"
X=0.6
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
OFF=$(echo "$D - 2*$X" | bc -l)
ffmpeg -v error -y -i "$SRC" -filter_complex \
 "[0:v]trim=start=$X,setpts=PTS-STARTPTS[body];[0:v]trim=end=$X,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=$X:offset=$OFF,format=yuv420p[v]" \
 -map "[v]" -an -c:v libx264 -crf 16 -preset slow "$TMP/loop.mp4"
ffmpeg -v error -y -i "$TMP/loop.mp4" -an -c:v libx264 -profile:v high -crf 20 -preset veryslow -pix_fmt yuv420p -movflags +faststart -r 24 "$OUT/hub-loop.mp4"
ffmpeg -v error -y -i "$TMP/loop.mp4" -an -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 -pix_fmt yuv420p -r 24 "$OUT/hub-loop.webm"
ffmpeg -v error -y -i "$TMP/loop.mp4" -frames:v 1 "$TMP/poster.png"
node -e "
const sharp=require('$ROOT/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp');
(async()=>{const i=sharp('$TMP/poster.png').resize({width:256,kernel:'lanczos3'});
await i.clone().avif({quality:70,effort:7}).toFile('$OUT/hub-loop-poster.avif');
await i.clone().webp({quality:86,effort:6}).toFile('$OUT/hub-loop-poster.webp');})()"
ls -la "$OUT"/hub-loop*
rm -rf "$TMP"
