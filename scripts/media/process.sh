#!/usr/bin/env bash
# Grades, crops and compresses the site's generated stills and videos.
#
#   bash scripts/media/process.sh            # everything
#   bash scripts/media/process.sh stills     # stills only
#   bash scripts/media/process.sh videos     # videos only
#
# Needs ImageMagick 7 and ffmpeg (with libx264 + libsvtav1). Re-run make_luts.py first if the grade changes.
# Stills land in src/assets/media (Astro builds the responsive AVIF/WebP sizes from them).
# Videos land in public/media: an AV1 file for browsers that can decode it, H.264 for everything else.
# Sources are the raw Higgsfield generations in the AdBoost redesign folder (see its assets/MANIFEST.md);
# set MEDIA_SRC to point elsewhere: MEDIA_SRC=/path/to/raw/health bash scripts/media/process.sh
set -euo pipefail

SITE="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="${MEDIA_SRC:-$(cd "$SITE/.." && pwd)/redesign/assets/raw/health}"
LUTS="$SITE/scripts/media"
STILLS="$SITE/src/assets/media"
VIDEOS="$SITE/public/media"
mkdir -p "$STILLS" "$VIDEOS"
export SVT_LOG=1   # SVT-AV1: errors only

# Matching: the grade keeps every picture's own colour, so a source that is greyer or more vivid than
# the rest stays so. SAT=<factor> (default 1) scales a shot's saturation BEFORE the grade, in still()
# and video(), so the set reads as one: SAT=1.2 still ...  or  SAT=0.85 video ...
sat_pct() { awk -v s="${SAT:-1}" 'BEGIN { printf "%g", s * 100 }'; }

# ---------- stills: crop to the layout's shape, grade, save a high-quality master ----------
still() { # still <source> <out name> [magick crop/resize args...]   (LUT=<file> still ... for another grade)
  local src="$1" out="$2"; shift 2
  local match=""
  if [ "${SAT:-1}" != 1 ]; then match="-modulate 100,$(sat_pct)"; fi
  # shellcheck disable=SC2086  # $match is meant to split into "-modulate 100,N"
  magick "${src}[0]" -alpha off -depth 8 -colorspace sRGB "$@" +repage $match -clamp \
    "$LUTS/${LUT:-grade.png}" -hald-clut -strip -quality 92 -sampling-factor 4:4:4 "$STILLS/$out.jpg"
  echo "  still  $out.jpg  $(magick identify -format '%wx%h' "$STILLS/$out.jpg")"
}

TILE=(-gravity center -crop 4:5 +repage -resize "1920x2400>")   # 4:5 tiles, never upscaled past the source

do_stills() {
  echo "stills"
  local S="$SRC"
  # hero: wide for desktop, a 4:5 crop around the table for phones
  still "$S/hero-1.png"   hero          -gravity center -crop 16:9 +repage -resize 3200x1800
  still "$S/hero-1.png"   hero-portrait -crop 2458x3072+2800+0 +repage -resize 1600x2000
  # services
  still "$S/svc-paid-media-4.png"         svc-paid-media         "${TILE[@]}"
  SAT=0.9 still "$S/svc-creative-1.png"          svc-creative           "${TILE[@]}"
  still "$S/svc-cro-2.png"                svc-cro                "${TILE[@]}"
  # industries
  SAT=1.2 still "$S/ind-glp-1-weight-loss-1.png" ind-glp-1-weight-loss  "${TILE[@]}"
  still "$S/ind-telehealth-1.png"         ind-telehealth         "${TILE[@]}"
  still "$S/ind-supplements-dtc-1.png"    ind-supplements-dtc    "${TILE[@]}"
  SAT=0.85 still "$S/ind-trt-hormone-2.png"       ind-trt-hormone        "${TILE[@]}"
  SAT=1.15 still "$S/ind-peptides-1.png"          ind-peptides           "${TILE[@]}"
  still "$S/ind-med-spa-1.png"            ind-med-spa            "${TILE[@]}"
  still "$S/ind-mental-health-1.png"      ind-mental-health      "${TILE[@]}"
  SAT=1.1 still "$S/ind-longevity-1.png"         ind-longevity          "${TILE[@]}"
  SAT=1.1 still "$S/ind-fertility-ivf-1.png"     ind-fertility-ivf      "${TILE[@]}"
}

# ---------- videos ----------
# Each clip is cropped, graded with the same LUT as the stills, and turned into a seamless loop:
# the last FADE seconds dissolve into the first, so the loop has no visible jump. A clip whose light or
# objects drift one way (the last frame differs from the first) plays forward then back: fade "pingpong".
video() { # video <source> <out name> <lut> <start> <end> <fade|pingpong> <fps> <filters before grading>   (SAT=<factor> video ... to match)
  local src="$1" out="$2" lut="$3" start="$4" end="$5" fade="$6" fps="$7" pre="$8"
  local len main_len offset graph
  len=$(echo "$end - $start" | bc -l)
  if [ "$fade" = pingpong ]; then
    graph="[0:v]eq=saturation=${SAT:-1},${pre},fps=${fps},format=rgb24[c];[c][1:v]haldclut=interp=tetrahedral,split[a][b];\
[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1,format=yuv420p[out]"
  else
    main_len=$(echo "$len - $fade" | bc -l)
    offset=$(echo "$main_len - $fade" | bc -l)
    graph="[0:v]eq=saturation=${SAT:-1},${pre},fps=${fps},format=rgb24[c];[c][1:v]haldclut=interp=tetrahedral,split[a][b];\
[a]trim=start=${fade}:end=${len},setpts=PTS-STARTPTS[main];\
[b]trim=start=0:end=${fade},setpts=PTS-STARTPTS[head];\
[main][head]xfade=transition=fade:duration=${fade}:offset=${offset},format=yuv420p[out]"
  fi

  # lossless-ish intermediate, so both encodes start from the same graded frames
  local tmp; tmp="$(mktemp -d)/$out.mkv"
  ffmpeg -v error -y -ss "$start" -t "$len" -i "$src" -i "$LUTS/$lut" \
    -filter_complex "$graph" -map "[out]" -an -c:v libx264 -preset veryfast -crf 8 "$tmp"
  encode "$tmp" "$out"
}

# the two delivery encodes and the poster, from a graded intermediate (which is removed afterwards)
encode() { # encode <intermediate.mkv> <out name>   (CRF=<h264 crf> AV1CRF=<av1 crf> to fit a size budget)
  local tmp="$1" out="$2"
  ffmpeg -v error -y -i "$tmp" -an -c:v libx264 -preset slow -crf "${CRF:-21}" -profile:v high -pix_fmt yuv420p \
    -movflags +faststart -tag:v avc1 "$VIDEOS/$out.mp4"
  ffmpeg -v error -y -i "$tmp" -an -c:v libsvtav1 -preset 5 -crf "${AV1CRF:-34}" -g 240 -pix_fmt yuv420p \
    -svtav1-params tune=0 -movflags +faststart "$VIDEOS/$out.av1.mp4"
  # the first frame, shown before the video plays (and instead of it, with reduced motion)
  ffmpeg -v error -y -i "$tmp" -frames:v 1 -q:v 2 "$STILLS/$out-poster.jpg"
  rm -f "$tmp"
  printf '  video  %-24s h264 %6s KB   av1 %6s KB   %s\n' "$out" \
    "$(( $(stat -f%z "$VIDEOS/$out.mp4") / 1024 ))" "$(( $(stat -f%z "$VIDEOS/$out.av1.mp4") / 1024 ))" \
    "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$VIDEOS/$out.mp4")"
}

do_videos() {
  echo "videos"
  local V="$SRC/video"
  # hero: Seedance 2.0 from the hero still. Full frame for wide screens, a 4:5 crop around the table for phones.
  video "$V/hero-1.mp4"                  hero                  grade.png 0 4 pingpong 24 "scale=1920:1080"
  video "$V/hero-1.mp4"                  hero-portrait         grade.png 0 4 pingpong 24 "scale=1920:1080,crop=864:1080:980:0"
  # feature tiles (4:5, from 3:4 renders)
  CRF=23 video "$V/svc-paid-media-1.mp4"        svc-paid-media        grade.png 0 7 0.7 24 "crop=iw:iw*5/4,scale=1080:1350"
  SAT=1.2 CRF=23 video "$V/ind-glp-1-weight-loss-1.mp4" ind-glp-1-weight-loss grade.png 0 7 0.7 24 "crop=iw:iw*5/4,scale=1080:1350"
}

case "${1:-all}" in
  stills) do_stills ;;
  videos) do_videos ;;
  all) do_stills; do_videos ;;
esac
