#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
export PATH="$PWD/.tools/node/bin:$PATH"

node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port "${PORT:-3000}"
