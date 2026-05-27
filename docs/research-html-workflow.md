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
└── qa.md
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
