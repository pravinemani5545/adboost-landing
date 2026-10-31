#!/usr/bin/env bash
# Wait up to 10 minutes until www.adboost.health serves the expected build.
# /build.txt is written by astro.config.mjs: line 1 the commit SHA
# (VERCEL_GIT_COMMIT_SHA), line 2 the build time (ISO 8601, UTC).
#   WANT_SHA     wait for this commit (a push deploy)
#   BUILT_AFTER  wait for a build later than this UTC time (a deploy-hook
#                rebuild, which keeps the same SHA)
set -euo pipefail
SHA="" AT=""
for _ in $(seq 1 60); do
  BUILD=$(curl -sf "https://www.adboost.health/build.txt?t=$(date +%s)" || true)
  SHA=$(printf '%s\n' "$BUILD" | sed -n 1p)
  AT=$(printf '%s\n' "$BUILD" | sed -n 2p)
  if { [ -z "${WANT_SHA:-}" ] || [ "$SHA" = "$WANT_SHA" ]; } &&
     { [ -z "${BUILT_AFTER:-}" ] || [[ "$AT" > "$BUILT_AFTER" ]]; }; then
    echo "Live build: $SHA built $AT"
    exit 0
  fi
  sleep 10
done
echo "Timed out waiting for the deploy (last seen: ${SHA:-none} built ${AT:-never})"
exit 1
