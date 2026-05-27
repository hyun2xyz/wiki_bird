# Wikibird

Wikibird is a small research-to-HTML harness. It defines an agent that can research a topic, synthesize the evidence, and produce a static wiki-style HTML page with visible citations.

Research pages also carry Chrome-captured screenshots as local page assets, so the final HTML has visible source/product evidence instead of text-only notes.

## Files

- `.claude/agents/research-html-builder.md` - reusable agent definition.
- `skills/wikibird-research-html/` - portable Agent Skills package for Codex, Claude, Gemini-compatible agents, Cursor, and other SKILL.md readers.
- `skills/wikibird-research-html/agents/openai.yaml` - optional OpenAI display metadata for skill-capable clients.
- `docs/research-html-workflow.md` - human-readable workflow and QA checklist.
- `docs/wiki-html-style-rules.md` - house style for compact wiki pages.
- `docs/distribution-plan.md` - publishing and cross-agent installation plan.
- `ex.html` - reference HTML shape and typography.
- `typst/wikibird-brief.typ` - shared Typst brief template for PDF/document experiments.
- `skills/wikibird-research-html/scripts/capture-chrome-screenshot.sh` - Chrome headless screenshot helper for skill users.
- `outputs/` - recommended location for generated pages.

## How to Use

Ask a skill-enabled assistant to use `$wikibird-research-html`.

Example prompt:

```text
Use $wikibird-research-html.
Research [topic] for [audience], then create outputs/YYYY-MM-DD-topic/index.html.
Include research.md and qa.md.
Use the Wikibird wiki style from ex.html and docs/wiki-html-style-rules.md.
```

For volatile facts, require live source verification. For private or local sources, provide the source files or exact paths.

Claude Code users can also use the project agent in `.claude/agents/research-html-builder.md`.

## Install As A Skill

From this repository:

```sh
scripts/install-skill.sh codex
scripts/install-skill.sh claude
scripts/install-skill.sh gemini
scripts/install-skill.sh cursor
```

Manual install is also just a folder copy:

```sh
cp -R skills/wikibird-research-html ~/.codex/skills/
cp -R skills/wikibird-research-html ~/.claude/skills/
cp -R skills/wikibird-research-html ~/.gemini/skills/
```

For ChatGPT or Claude web/workspace, zip the `skills/wikibird-research-html` folder and upload it through the product's Skills UI.

For Gemini CLI custom-command fallback:

```sh
mkdir -p ~/.gemini/commands
cp adapters/gemini/commands/wikibird.toml ~/.gemini/commands/
```

## Publishing

The generated `outputs/.../index.html` files are static and can be opened locally or published with GitHub Pages.

Typst experiments live under each output's `typst/` folder. Compile from the repository root:

```sh
typst compile --root . outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.pdf
typst compile --root . --features html outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.html
```

Typst HTML export is still marked incomplete by the compiler, so use the PDF output as the more stable Typst result.

## License

MIT. The standalone skill folder also includes a copy of the license so it can be distributed by itself.
