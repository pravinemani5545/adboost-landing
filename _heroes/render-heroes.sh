#!/bin/bash
# Render hero-*.html at 1600x900 @2x using the SAME Chrome flags proven by the
# adboost-health-social render.sh (virtual-time-budget so web fonts fully load,
# 3-retry so a flaky headless run does not abort the batch).
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
W=1600; H=900
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$DIR/out"
shopt -s nullglob
FILES=("$DIR"/hero-*.html)
[ ${#FILES[@]} -eq 0 ] && { echo "no hero-*.html in $DIR"; exit 1; }
for f in "${FILES[@]}"; do
  n=$(basename "$f" .html)
  rm -f "$DIR/out/$n.png"
  for attempt in 1 2 3; do
    "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
      --window-size="$W","$H" --virtual-time-budget=8000 \
      --screenshot="$DIR/out/$n.png" "file://$f" >/dev/null 2>&1 || true
    [ -s "$DIR/out/$n.png" ] && break
    [ "$attempt" = 3 ] && { echo "  FAILED $n after 3 attempts"; exit 1; }
  done
  echo "  rendered $n.png"
done
echo "done -> $DIR/out/"
