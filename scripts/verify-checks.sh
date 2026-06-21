#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

npm run assets:audit
node scripts/verify-layout.mjs
node scripts/visual-regression.mjs compare
