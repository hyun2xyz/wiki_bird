# Research to HTML Workflow

## Scope

Capture topic, audience, output language, freshness needs, required sources, banned sources, desired output path, and research depth.

## Research Depth

Use `중` unless the user says otherwise.

On first activation or after a fresh install, ask the user to choose a default research depth:

```text
리서치 깊이를 기본값으로 정해둘까요? 하/중/상 중에서 고르면 됩니다.
하: 빠른 개요, 중: 일반 Wikibird 문서, 상: 공부용 깊은 조사입니다.
```

If the user gives a concrete task and does not answer the setup question, proceed with `중` for that task and note that the default can be changed later.

| Depth | Sources | Screenshots | Use when |
| --- | --- | --- | --- |
| `하` | 3-5 | 1-2 | Quick orientation, short explanation, small note. |
| `중` | 6-10 | 3-5 | Default Wikibird explainer, study note, practical research page. |
| `상` | 10+ where available | 5-8 | Person/company/technology history, serious study, market map, complex comparison. |

Record the selected depth in `research.md`. If the requested depth is impossible because sources are sparse or screenshots fail, continue with the closest possible output and explain the limit in `qa.md`.

## Source Map

Create a table with:

- source title
- URL
- source type
- date or freshness
- why it matters
- key claim

Prioritize official and primary sources. Use secondary sources only for context unless the topic is about reception, opinion, or cultural reading.

## Chrome Screenshots

Capture screenshots during research, not after the page is already written.

Default:

- Create `assets/screenshots/`.
- Capture screenshots according to the selected depth: `하` 1-2, `중` 3-5, `상` 5-8 when useful public visual sources exist.
- Prefer primary-source pages: official docs, official product pages, grant/application pages, original papers, or the final rendered HTML page.
- Use a desktop viewport around `1440x1000` unless the topic is specifically mobile.
- Record each screenshot in `research.md` with URL, capture date, viewport, and why it was used.
- Add a short image coverage note: what was captured, what was intentionally not captured, and what failed.
- Do not screenshot every keyword mechanically. Use images to anchor major sections.

Use the agent's Chrome/browser tool when available. If not, use:

```sh
skills/wikibird-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

Do not capture private dashboards, logged-in personal data, paid articles, payment screens, cookies, passwords, or user-sensitive pages unless the user explicitly asks and the image is safe to publish.

## Person Profile Baseline

For a person page, include a basic profile before interpretation:

- Name, common public role, and why the person matters.
- Birth date or age, birthplace, nationality/background, and education when reliable public sources support it.
- Current affiliation and career timeline.
- One public visual/profile screenshot when available.
- One or more screenshots of representative work: course, paper, company, product, talk, or project page.
- Missing or conflicting profile facts should be labeled as missing/conflicting, not guessed.

## Claim Ledger

Turn research into claim rows:

- claim
- confidence
- evidence
- caveats or conflicts

Only put claims in the HTML if they are sourced or clearly labeled as interpretation.

## Page Plan

Build the article around reader understanding:

1. Summary.
2. Key findings.
3. Background and recent changes.
4. How it works.
5. Details or walkthrough.
6. Implications or next steps.
7. Sources.

## Build

Create a single static `index.html` with semantic HTML, inline CSS, visible citations, and no build step. Use JavaScript only for small UI behavior such as mobile TOC toggling.

The final source section label is `출처`.

Embed useful screenshots with:

```html
<figure class="screenshot">
  <img src="assets/screenshots/01-example.png" alt="Example page screenshot captured in Chrome">
  <figcaption>Chrome screenshot of the official example page, captured YYYY-MM-DD.</figcaption>
</figure>
```

## QA

After writing a research output, run `node scripts/build-index.js` from the repo root so the local top-level `index.html` stays current.

Write `qa.md` with:

```md
# QA

- Rendered locally: yes/no
- Desktop layout checked: yes/no
- Mobile layout checked: yes/no
- Links checked: yes/no
- Citation section present: yes/no
- Desktop left TOC checked: yes/no
- Mobile TOC drawer checked: yes/no
- Chrome screenshots captured: yes/no
- Screenshot figures embedded: yes/no
- Depth recorded: yes/no
- Screenshot count matches depth: yes/no
- Person profile baseline checked: yes/no/not applicable
- Overflow checked: yes/no
- Known limits:
```
