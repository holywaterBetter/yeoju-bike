#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
export PATH="$PWD/.tools/node/bin:$PATH"

node node_modules/next/dist/bin/next build

mkdir -p .next
scripts/start-server.sh > .next/start-server.log 2>&1 &
server_pid=$!

cleanup() {
  kill "$server_pid" 2>/dev/null || true
}
trap cleanup EXIT

ready=0
for _ in $(seq 1 60); do
  if curl -fsS "http://127.0.0.1:${PORT:-3000}" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 1
done

if [ "$ready" -ne 1 ]; then
  echo "Production server did not become ready." >&2
  cat .next/start-server.log >&2 || true
  exit 1
fi

VISUAL_MAX_MISMATCH_PERCENT="${VISUAL_MAX_MISMATCH_PERCENT:-1}" VISUAL_CHANNEL_TOLERANCE="${VISUAL_CHANNEL_TOLERANCE:-2}" node scripts/visual-check.mjs
