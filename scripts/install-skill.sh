#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="wikibird-research-html"
SOURCE="$ROOT/skills/$SKILL_NAME"

usage() {
  cat <<'USAGE'
Usage:
  scripts/install-skill.sh <target>

Targets:
  codex        install to ~/.codex/skills/
  claude       install to ~/.claude/skills/
  gemini       install to ~/.gemini/skills/
  cursor       install to ~/.cursor/skills/
  all          install to all targets above

The script copies skills/wikibird-research-html into the selected personal skill directory.
USAGE
}

install_one() {
  local target="$1"
  local base
  case "$target" in
    codex) base="$HOME/.codex/skills" ;;
    claude) base="$HOME/.claude/skills" ;;
    gemini) base="$HOME/.gemini/skills" ;;
    cursor) base="$HOME/.cursor/skills" ;;
    *) echo "Unknown target: $target" >&2; usage; exit 2 ;;
  esac

  mkdir -p "$base"
  rm -rf "$base/$SKILL_NAME"
  cp -R "$SOURCE" "$base/$SKILL_NAME"
  echo "Installed $SKILL_NAME -> $base/$SKILL_NAME"
}

if [[ $# -ne 1 ]]; then
  usage
  exit 2
fi

case "$1" in
  all)
    install_one codex
    install_one claude
    install_one gemini
    install_one cursor
    ;;
  codex|claude|gemini|cursor)
    install_one "$1"
    ;;
  *)
    usage
    exit 2
    ;;
esac
