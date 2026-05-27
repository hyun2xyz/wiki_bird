# Research to HTML Workflow

This document is the reusable playbook for turning research into a static HTML page.

## Goal

Create a trustworthy, source-backed wiki-style HTML artifact from a research question or topic. The output should be easy to open locally, publish on GitHub Pages, or adapt into another site.

For this repository, use `ex.html` and `docs/wiki-html-style-rules.md` as the default format guide.

## Default File Structure

```text
outputs/YYYY-MM-DD-topic-slug/
├── index.html
├── research.md
├── qa.md
└── assets/
    └── screenshots/
        └── 01-source-or-page.png
```

Use a shorter structure only for very small tasks.

## Phase 1: Scope

Before researching, capture:

- Topic or question.
- Audience.
- Desired language and tone.
- Required output path.
- Deadline or freshness requirement.
- Must-use or banned sources.
- Whether the page is informational, persuasive, instructional, or comparative.

If the topic includes current facts, do live verification.

## Phase 2: Source Map

Create a compact source table:

| Source | Type | Date | Why it matters | Key claim |
| --- | --- | --- | --- | --- |
| Official page, filing, paper, or article | Primary / secondary | YYYY-MM-DD | Relevance | Claim summary |

Source priority:

1. Official or primary source.
2. Original dataset, paper, filing, or technical documentation.
3. Reputable analysis or reporting.
4. Community posts only for user sentiment or anecdotal evidence.

Avoid:

- Unsourced summaries.
- Copied article text.
- AI-generated pages without citations.
- Old pages for volatile claims unless clearly marked as historical.

## Phase 2.5: Chrome Screenshots

Every research HTML page should include at least one Chrome-captured image.

Default capture rules:

- Create `assets/screenshots/`.
- Prefer screenshots from primary sources: official product pages, official docs, grant/application pages, standards, paper landing pages, or the rendered final HTML page.
- For visual/product/tool research, capture 2-4 screenshots when useful.
- Use desktop viewport around `1440x1000` unless the topic is mobile-first.
- Record URL, capture date, viewport, and purpose in `research.md`.
- Embed selected screenshots in `index.html` as real `<figure>` blocks.

If the agent has a native Chrome/browser tool, use that first. If not, use the bundled helper:

```sh
skills/wikibird-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

Do not screenshot private dashboards, personal data, paid source text, cookies, passwords, or logged-in account pages unless the user explicitly asks and the result is safe to publish.

## Phase 3: Claim Ledger

Turn research into claims:

| Claim | Confidence | Evidence | Notes |
| --- | --- | --- | --- |
| Clear factual statement | High / Medium / Low | Source links | Conflicts, caveats, or inference |

Rules:

- Use exact dates for time-sensitive claims.
- Mark inference explicitly.
- Keep recommendations separate from facts.
- Do not include a claim in the HTML if it has no evidence and is not labeled as opinion.

## Phase 4: Page Plan

Build the page around the reader's job:

- Title: literal subject.
- Lead: the practical takeaway in plain Korean.
- Body: grouped by decision points or learning steps.
- Visuals: tables, timelines, comparison grids, diagrams, screenshots, or simple charts.
- Sources: visible and easy to inspect.

Default sections:

1. Summary.
2. Key findings.
3. Background and recent changes.
4. How it works.
5. Details or walkthrough.
6. Implications or next steps.
7. Sources.

## Phase 5: HTML Build

Default requirements:

- One self-contained `index.html`.
- Semantic HTML.
- Responsive CSS in `<style>`.
- No build step unless requested.
- No external tracking scripts.
- Source links visible in the page.
- Works at mobile and desktop widths.
- Compact wiki layout with a left fixed table of contents on desktop.
- Namuwiki-adjacent Korean tone: direct, human, plain, and lightly explanatory.

Quality checks:

- Page title is specific.
- First screen clearly identifies the topic.
- Text does not overflow buttons, cards, tables, or headings.
- Links are distinguishable.
- Citations are not hidden in comments.
- Colors meet normal readability expectations.
- Screenshot figures have useful `alt` text and captions.

## Phase 6: QA

Record checks in `qa.md`:

```md
# QA

- Rendered locally: yes/no
- Desktop layout checked: yes/no
- Mobile layout checked: yes/no
- Links checked: yes/no
- Citation section present: yes/no
- Desktop left TOC checked: yes/no
- Chrome screenshots captured: yes/no
- Screenshot figures embedded: yes/no
- Known limits:
```

If a check cannot be performed, say why.

## Git Sharing Checklist

Before sharing:

- No secrets, tokens, private cookies, or paid article text.
- No large copied source dumps.
- Source URLs are present.
- Generated output is in `outputs/`.
- Agent definition is in `.claude/agents/research-html-builder.md`.
- README explains how to use the agent.
