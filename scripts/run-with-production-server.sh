#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 2
fi

cd "$(dirname "$0")/.."
export PATH="$PWD/.tools/node/bin:$PATH"

NODE_ENV=production node node_modules/next/dist/bin/next build

mkdir -p .next
port="${PORT:-$(node scripts/find-free-port.mjs)}"
host="${HOST:-127.0.0.1}"
server_log=".next/verify-server-${port}.log"

HOST="$host" PORT="$port" bash scripts/start-server.sh > "$server_log" 2>&1 &
server_pid=$!

cleanup() {
  kill "$server_pid" 2>/dev/null || true
}
trap cleanup EXIT

ready=0
for _ in $(seq 1 60); do
  if curl -fsS "http://${host}:${port}" >/dev/null 2>&1; then
    ready=1
    break
  fi

  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "Production server exited before becoming ready." >&2
    cat "$server_log" >&2 || true
    exit 1
  fi

  sleep 1
done

if [ "$ready" -ne 1 ]; then
  echo "Production server did not become ready." >&2
  cat "$server_log" >&2 || true
  exit 1
fi

export VISUAL_BASE_URL="http://${host}:${port}"
export LAYOUT_BASE_URL="$VISUAL_BASE_URL"
export RESPONSIVE_BASE_URL="$VISUAL_BASE_URL"

"$@"
