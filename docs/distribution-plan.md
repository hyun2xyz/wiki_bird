# Wikibird Skill Distribution Plan

Updated: 2026-05-27

## Decision

Use the Agent Skills `SKILL.md` folder format as the canonical package. It is the best cross-agent baseline because it is simple, versionable, and works as a folder that can be copied into each tool's skill directory.

Canonical skill:

```text
skills/wikibird-research-html/
├── SKILL.md
├── LICENSE
├── agents/openai.yaml
├── scripts/
├── references/
└── assets/
```

## Current Platform Reality

| Platform | Best path | Notes |
| --- | --- | --- |
| Codex / ChatGPT | Install or upload the `skills/wikibird-research-html` folder. | OpenAI documents skills as reusable workflows, supported in ChatGPT, Codex, and API. Skills do not sync across products yet. |
| Claude Code | Copy to `~/.claude/skills/wikibird-research-html` or `.claude/skills/wikibird-research-html`. | Claude Code discovers personal and project skills from these directories. |
| Claude web/workspace | Upload/share the skill package if the workspace has Skills enabled. | Workspace sharing is controlled by plan/admin settings. |
| Gemini CLI | Prefer Agent Skills folder if the local version supports it. Also provide a custom command fallback. | Official Gemini CLI docs clearly support project/user custom commands. Agent Skills support is evolving across Gemini CLI/Antigravity variants, so the repo includes both a skill folder and `adapters/gemini/commands/wikibird.toml`. |
| Other agents | Copy the same `SKILL.md` folder into the agent's skill directory if it supports Agent Skills. | Keep the package standard: `SKILL.md`, `references/`, `assets/`, no hidden local dependencies. |

Reference docs checked on 2026-05-27:

- OpenAI Skills in ChatGPT: <https://help.openai.com/en/articles/20001066-skills-in-chatgpt>
- Agent Skills specification: <https://agentskills.io/specification>
- Claude Code skills: <https://docs.claude.com/en/docs/claude-code/skills>
- Claude web skills: <https://support.claude.com/en/articles/12512180-use-skills-in-claude>
- Gemini CLI custom commands: <https://google-gemini.github.io/gemini-cli/docs/cli/custom-commands.html>

## Install

From the repo root:

```sh
scripts/install-skill.sh codex
scripts/install-skill.sh claude
scripts/install-skill.sh gemini
scripts/install-skill.sh cursor
scripts/install-skill.sh all
```

Manual install examples:

```sh
cp -R skills/wikibird-research-html ~/.codex/skills/
cp -R skills/wikibird-research-html ~/.claude/skills/
cp -R skills/wikibird-research-html ~/.gemini/skills/
```

Gemini custom command fallback:

```sh
mkdir -p ~/.gemini/commands
cp adapters/gemini/commands/wikibird.toml ~/.gemini/commands/
```

Then call it as a Gemini CLI custom command, passing the topic as arguments.

## Publishing Path

1. Keep GitHub as the canonical distribution source.
2. Add release tags when the skill interface changes, e.g. `v0.1.0`.
3. Submit/share the GitHub repo or the `skills/wikibird-research-html` folder to Agent Skills directories and community marketplaces that accept GitHub skill folders.
4. For ChatGPT or Claude workspace users, zip only the `skills/wikibird-research-html` folder and upload it through the product UI.
5. Avoid bundling secrets, cookies, paid source dumps, private research files, or generated outputs inside the skill package.

## Public Listing Notes

- There is not one universal official app store for all model vendors. Treat GitHub as the source of truth and list/share the same skill folder wherever a directory or workspace marketplace accepts Agent Skills.
- The safest public artifact is the standalone `skills/wikibird-research-html` folder: it contains `SKILL.md`, references, assets, metadata, and license text.
- Do not publish generated `outputs/` as part of the skill package. Keep them as examples in the repo only.

## Quality Bar Before Public Listing

- `SKILL.md` has clear `name` and `description` frontmatter.
- `SKILL.md` includes a redistributable license.
- Skill body stays concise and points to references.
- References are self-contained.
- Assets are safe to redistribute.
- Installation script copies only the skill folder.
- README explains installation.
- At least one sample output exists in `outputs/`.
