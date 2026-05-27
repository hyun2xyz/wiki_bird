#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  capture-chrome-screenshot.sh <url-or-file-url> <output.png> [width] [height]

Defaults:
  width  = 1440
  height = 1000

Examples:
  capture-chrome-screenshot.sh https://example.com outputs/demo/assets/screenshots/01-example.png
  capture-chrome-screenshot.sh file:///tmp/page.html outputs/demo/assets/screenshots/02-local-page.png 1280 900
USAGE
}

if [[ $# -lt 2 || $# -gt 4 ]]; then
  usage
  exit 2
fi

TARGET_URL="$1"
OUTPUT_PATH="$2"
WIDTH="${3:-1440}"
HEIGHT="${4:-1000}"
SCREENSHOT_TIMEOUT="${SCREENSHOT_TIMEOUT:-20}"

if [[ ! "$WIDTH" =~ ^[0-9]+$ || ! "$HEIGHT" =~ ^[0-9]+$ ]]; then
  echo "Width and height must be numeric." >&2
  exit 2
fi

find_chrome() {
  if [[ -n "${CHROME_BIN:-}" && -x "$CHROME_BIN" ]]; then
    printf '%s\n' "$CHROME_BIN"
    return 0
  fi

  local candidates=(
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
    "google-chrome"
    "google-chrome-stable"
    "chromium"
    "chromium-browser"
  )

  local candidate
  for candidate in "${candidates[@]}"; do
    if [[ "$candidate" == /* && -x "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
    if [[ "$candidate" != /* ]] && command -v "$candidate" >/dev/null 2>&1; then
      command -v "$candidate"
      return 0
    fi
  done

  return 1
}

CHROME="$(find_chrome)" || {
  echo "Google Chrome or Chromium was not found. Set CHROME_BIN to the browser executable." >&2
  exit 1
}

mkdir -p "$(dirname "$OUTPUT_PATH")"
PROFILE_DIR="$(mktemp -d)"
CHROME_LOG="$(mktemp)"
cleanup() {
  rm -rf "$PROFILE_DIR"
  rm -f "$CHROME_LOG"
}
trap cleanup EXIT

set +e
"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --no-first-run \
  --no-default-browser-check \
  --disable-background-networking \
  --disable-features=PaintHolding,CalculateNativeWinOcclusion \
  --user-data-dir="$PROFILE_DIR" \
  --window-size="${WIDTH},${HEIGHT}" \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=3000 \
  --screenshot="$OUTPUT_PATH" \
  "$TARGET_URL" >"$CHROME_LOG" 2>&1 &
CHROME_PID=$!

elapsed=0
while kill -0 "$CHROME_PID" >/dev/null 2>&1; do
  if [[ -s "$OUTPUT_PATH" ]]; then
    kill "$CHROME_PID" >/dev/null 2>&1 || true
    break
  fi
  if (( elapsed >= SCREENSHOT_TIMEOUT )); then
    kill "$CHROME_PID" >/dev/null 2>&1 || true
    sleep 1
    kill -9 "$CHROME_PID" >/dev/null 2>&1 || true
    wait "$CHROME_PID" >/dev/null 2>&1 || true
    echo "Timed out while capturing $TARGET_URL" >&2
    tail -20 "$CHROME_LOG" >&2 || true
    exit 1
  fi
  sleep 1
  elapsed=$((elapsed + 1))
done

wait "$CHROME_PID" >/dev/null 2>&1
status=$?
set -e

if [[ ! -s "$OUTPUT_PATH" && "$status" -ne 0 ]]; then
  echo "Chrome screenshot failed with exit code $status." >&2
  tail -20 "$CHROME_LOG" >&2 || true
  exit "$status"
fi

test -s "$OUTPUT_PATH"
echo "Captured $TARGET_URL -> $OUTPUT_PATH (${WIDTH}x${HEIGHT})"
