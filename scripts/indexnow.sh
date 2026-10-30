#!/usr/bin/env bash
# Submit changed URLs to IndexNow (Bing, Copilot, Yandex, Seznam, Naver).
# Usage: scripts/indexnow.sh <since YYYY-MM-DD> [extra URL ...]
# Sends the live sitemap URLs whose lastmod is on or after <since> (truthful
# content dates, health plan T1), plus any extra URLs (redirect sources added
# or changed by the deploy). Sends nothing when the list is empty.
set -euo pipefail
HOST=www.adboost.health
KEY=70b8bdc92dc75dde445e7495e95258f2
SINCE="$1"
shift

CHANGED=$(curl -sf "https://$HOST/sitemap-0.xml?t=$(date +%s)" \
  | grep -oE '<url><loc>[^<]+</loc><lastmod>[0-9]{4}-[0-9]{2}-[0-9]{2}' \
  | sed -E 's#<url><loc>([^<]+)</loc><lastmod>(.*)#\2 \1#' \
  | awk -v since="$SINCE" '$1 >= since { print $2 }')

URLS=$({ printf '%s\n' "$CHANGED"; printf '%s\n' "$@"; } | grep -E '^https://' | sort -u | jq -R . | jq -sc .)
COUNT=$(jq 'length' <<<"$URLS")
if [ "$COUNT" -eq 0 ]; then
  echo "No URLs changed since $SINCE; nothing submitted."
  exit 0
fi
echo "Submitting $COUNT URL(s) changed since $SINCE:"
jq -r '.[]' <<<"$URLS"
BODY=$(jq -nc --arg host "$HOST" --arg key "$KEY" --argjson urls "$URLS" \
  '{host: $host, key: $key, keyLocation: "https://\($host)/\($key).txt", urlList: $urls}')
curl -sS -X POST 'https://api.indexnow.org/indexnow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "$BODY" -w '\nHTTP %{http_code}\n' || echo "IndexNow submission failed (non-fatal)"
