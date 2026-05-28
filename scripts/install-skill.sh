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
  codex        install to $HOME/.agents/skills/ (current Codex user scope)
  codex-legacy install to ~/.codex/skills/ (older Codex setups)
  claude       install to ~/.claude/skills/

The script overwrites any existing Wikibird skill folder in the selected personal skill directory.
USAGE
}

install_one() {
  local target="$1"
  local base
  case "$target" in
    codex) base="$HOME/.agents/skills" ;;
    codex-legacy) base="$HOME/.codex/skills" ;;
    claude) base="$HOME/.claude/skills" ;;
    *) echo "Unknown target: $target" >&2; usage; exit 2 ;;
  esac

  mkdir -p "$base"
  if [[ -e "$base/$SKILL_NAME" ]]; then
    echo "Overwriting existing $base/$SKILL_NAME"
  fi
  rm -rf "$base/$SKILL_NAME"
  cp -R "$SOURCE" "$base/$SKILL_NAME"
  echo "Installed $SKILL_NAME -> $base/$SKILL_NAME"
}

if [[ $# -ne 1 ]]; then
  usage
  exit 2
fi

case "$1" in
  codex|codex-legacy|claude)
    install_one "$1"
    ;;
  *)
    usage
    exit 2
    ;;
esac
