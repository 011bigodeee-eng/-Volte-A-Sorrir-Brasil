#!/usr/bin/env bash
set -euo pipefail
cd /workspace/-Volte-A-Sorrir-Brasil
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run build
npm run typecheck
