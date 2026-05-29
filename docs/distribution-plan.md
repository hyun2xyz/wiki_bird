# iiki Skill Distribution Plan

Updated: 2026-05-28

## Decision

Use the Agent Skills `SKILL.md` folder format as the canonical package. It is the best cross-agent baseline because it is simple, versionable, and works as a folder that can be copied into each tool's skill directory.

Canonical skill:

```text
skills/iiki-research-html/
├── SKILL.md
├── LICENSE
├── agents/openai.yaml
├── scripts/
│   ├── capture-chrome-screenshot.sh
│   ├── export-iyo-wiki-text.js
│   ├── build-typst-booklet.js
│   └── lib/iiki-html-export.js
├── references/
└── assets/
```

## Current Platform Reality

| Platform | Best path | Notes |
| --- | --- | --- |
| ChatGPT / GPT | If Skills upload is available, upload the `skills/iiki-research-html` folder as a zip. Otherwise provide the GitHub URL or paste `SKILL.md` into Custom Instructions / project instructions. | GitHub URL works for one conversation when the model can read it. Persistent auto-activation requires a supported Skills or instruction surface. |
| Codex | Install with `scripts/install-skill.sh codex` or copy the folder to `~/.codex/skills/`. | Project-level fallback is `AGENTS.md` with a pointer to the skill folder or repo URL. |
| Claude Code | Copy to `~/.claude/skills/iiki-research-html` or `.claude/skills/iiki-research-html`. | Claude Code discovers personal and project skills from these directories. |
| Claude web/workspace | Upload/share the skill package if the workspace has Skills enabled. Otherwise provide the GitHub URL or put `SKILL.md` in Project knowledge / custom instructions. | Workspace sharing is controlled by plan/admin settings. |
| Gemini CLI | Prefer a custom command fallback: copy `adapters/gemini/commands/iiki.toml` to `~/.gemini/commands/`. | Official Gemini CLI docs clearly support project/user custom commands. Agent Skills support varies across Gemini/Antigravity variants. |
| Other agents | Copy the same `SKILL.md` folder into the agent's skill directory if it supports Agent Skills. | Keep the package standard: `SKILL.md`, `references/`, `assets/`, no hidden local dependencies. |

iiki-specific activation check: after the skill is active, normal assistant replies should end with `짹`. If a host does not auto-load skills, put that voice rule in the host's custom instruction or command prompt.

First-run setup check: ask the user to choose default research depth, `하` quick overview, `중` normal iiki document, or `상` deep study research. If they skip the question and give an immediate task, use `중` and say it can be changed later.

Optional output checks: when users ask for IYO Wiki copy-paste text, generate `iyo-wiki.txt`; when they ask for Typst/PDF/booklet output, generate `typst/main.typ` and `typst/index.pdf`.

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
cp -R skills/iiki-research-html ~/.codex/skills/
cp -R skills/iiki-research-html ~/.claude/skills/
cp -R skills/iiki-research-html ~/.gemini/skills/
```

Gemini custom command fallback:

```sh
mkdir -p ~/.gemini/commands
cp adapters/gemini/commands/iiki.toml ~/.gemini/commands/
```

Then call it as a Gemini CLI custom command, passing the topic as arguments.

## Publishing Path

1. Keep GitHub as the canonical distribution source.
2. Add release tags when the skill interface changes, e.g. `v0.1.0`.
3. Submit/share the GitHub repo or the `skills/iiki-research-html` folder to Agent Skills directories and community marketplaces that accept GitHub skill folders.
4. For ChatGPT or Claude workspace users, zip only the `skills/iiki-research-html` folder and upload it through the product UI.
5. Avoid bundling secrets, cookies, paid source dumps, private research files, or generated outputs inside the skill package.
6. If GitHub Pages is enabled, use the `docs/` folder as the Pages source. `docs/index.html` is the public iiki manual.

## Public Listing Notes

- There is not one universal official app store for all model vendors. Treat GitHub as the source of truth and list/share the same skill folder wherever a directory or workspace marketplace accepts Agent Skills.
- The safest public artifact is the standalone `skills/iiki-research-html` folder: it contains `SKILL.md`, references, assets, metadata, and license text.
- The repo root `index.html` is a local-only generated list of research outputs. Do not use it as the public landing page.
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
