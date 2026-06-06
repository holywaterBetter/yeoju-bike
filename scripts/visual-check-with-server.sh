#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
export PATH="$PWD/.tools/node/bin:$PATH"

mkdir -p .next

scripts/dev-server.sh > .next/dev-server.log 2>&1 &
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
  echo "Server did not become ready." >&2
  cat .next/dev-server.log >&2 || true
  exit 1
fi

VISUAL_MAX_MISMATCH_PERCENT="${VISUAL_MAX_MISMATCH_PERCENT:-0}" node scripts/visual-check.mjs
