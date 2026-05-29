# Research to HTML Workflow

This document is the reusable playbook for turning research into a static HTML page.

## Goal

Create a trustworthy, source-backed wiki-style HTML artifact from a research question or topic. The output should be easy to open locally, publish on GitHub Pages, or adapt into another site.

For this repository, use `docs/wiki-html-style-rules.md` as the default format guide.

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
- Research depth: `하`, `중`, or `상`. Default is `중`.
- Required output path.
- Deadline or freshness requirement.
- Must-use or banned sources.
- Whether the page is informational, persuasive, instructional, or comparative.

On first activation or after a fresh install, ask the user to choose a default research depth:

```text
리서치 깊이를 기본값으로 정해둘까요? 하/중/상 중에서 고르면 됩니다.
하: 빠른 개요, 중: 일반 iiki 문서, 상: 공부용 깊은 조사입니다.
```

If the user gives a concrete task and does not answer the setup question, proceed with `중` for that task and note that the default can be changed later.

If the topic includes current facts, do live verification.

Depth settings:

| Depth | Sources | Screenshots | Best for |
| --- | --- | --- | --- |
| `하` | 3-5 | Essential captures only | Quick orientation or short note. |
| `중` | 6-10 | As needed for major sections | Default iiki page. |
| `상` | 10+ where available | Enough for understanding and verification | Person/company/technology history, serious study notes, complex comparisons. |

Record the selected depth in `research.md`.

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
- Match screenshot coverage to research depth and the topic. There is no fixed maximum image count; add more screenshots when they clarify the research, support a claim, or make a person/product/project easier to understand.
- For people, products, tools, places, books, courses, companies, and visual-reference research, include enough images that the page is not text-only.
- Use desktop viewport around `1440x1000` unless the topic is mobile-first.
- Record URL, capture date, viewport, and purpose in `research.md`.
- Add an image coverage note to `research.md`: captured, intentionally skipped, failed.
- Embed selected screenshots in `index.html` as real `<figure>` blocks.
- Do not screenshot every keyword. Capture images that anchor important sections and help the reader understand the subject.

If the agent has a native Chrome/browser tool, use that first. If not, use the bundled helper:

```sh
skills/iiki-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

Do not screenshot private dashboards, personal data, paid source text, cookies, passwords, or logged-in account pages unless the user explicitly asks and the result is safe to publish.

### Person Profile Baseline

When the topic is a person, research the basic profile before the larger interpretation:

- Full name, common name, occupation/role, and why they matter.
- Birth date or age, birthplace, nationality/background, and education when reliable public sources support it.
- Current affiliation and major career timeline.
- Public face/appearance reference from an official bio, personal site, university/company profile, conference page, or reputable public page when available.
- Representative work screenshots: official project, course, paper, company/product, lecture, or talk page.
- If a profile fact is not reliably available, say it is not confirmed.

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

- Start from `templates/research-page.html`, or from the installed copy at `skills/iiki-research-html/templates/research-page.html`.
- Keep the iiki/IYO clean-view layout contract: centered article, fixed desktop left TOC, mobile off-canvas TOC, top button, and quiet white/gray wiki surface.
- One self-contained `index.html`.
- Semantic HTML.
- Responsive CSS in `<style>`.
- No build step unless requested.
- No external tracking scripts.
- Source links visible in the page.
- Works at mobile and desktop widths.
- Compact wiki layout with a left fixed table of contents on desktop.
- Source section heading is `출처`.
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

After writing a research output, run `node scripts/build-index.js` from the repo root. The generated root `index.html` is a local-only list of iiki outputs.

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
- Depth recorded: yes/no
- Screenshot coverage fits topic/depth: yes/no
- Person profile baseline checked: yes/no/not applicable
- Known limits:
```

If a check cannot be performed, say why.

## Git Sharing Checklist

Before sharing:

- No secrets, tokens, private cookies, or paid article text.
- No large copied source dumps.
- Source URLs are present.
- Generated output is in `outputs/`.
- Agent definition is in `.claude/agents/iiki-research-html-builder.md`.
- README explains how to use the agent.
