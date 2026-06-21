#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
exec bash scripts/run-with-production-server.sh node scripts/visual-regression.mjs compare
