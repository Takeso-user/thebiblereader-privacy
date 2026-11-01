#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# run_web.sh — Start local web server for BibleReaderWeb and open in browser
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$(dirname "$SCRIPT_DIR")"
PORT="${1:-8080}"

echo "━━━ Starting TheBibleReader Web Showcase on http://localhost:${PORT} ━━━"
cd "$WEB_DIR"

# Open browser after a short delay
(sleep 1 && open "http://localhost:${PORT}" 2>/dev/null || true) &

exec python3 -m http.server "$PORT"

