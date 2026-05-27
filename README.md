# Wikibird

Wikibird is a small research-to-HTML harness. It defines an agent that can research a topic, synthesize the evidence, and produce a static HTML page with visible citations.

## Files

- `.claude/agents/research-html-builder.md` - reusable agent definition.
- `docs/research-html-workflow.md` - human-readable workflow and QA checklist.
- `outputs/` - recommended location for generated pages.

## How to Use

Ask an agent-enabled coding assistant to use `research-html-builder`.

Example prompt:

```text
Use the research-html-builder agent.
Research [topic] for [audience], then create outputs/YYYY-MM-DD-topic/index.html.
Include research.md and qa.md.
```

For volatile facts, require live source verification. For private or local sources, provide the source files or exact paths.

## Publishing

The generated `outputs/.../index.html` files are static and can be opened locally or published with GitHub Pages.
