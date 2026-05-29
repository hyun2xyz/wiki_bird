# Research to HTML Workflow

## Scope

Capture topic, audience, output language, freshness needs, required sources, banned sources, desired output path, and research depth.

## Research Depth

Use `중` unless the user says otherwise.

On first activation or after a fresh install, ask the user to choose a default research depth:

```text
리서치 깊이를 기본값으로 정해둘까요? 하/중/상 중에서 고르면 됩니다.
하: 빠른 개요, 중: 일반 iiki 문서, 상: 공부용 깊은 조사입니다.
```

If the user gives a concrete task and does not answer the setup question, proceed with `중` for that task and note that the default can be changed later.

| Depth | Sources | Screenshots | Use when |
| --- | --- | --- | --- |
| `하` | 3-5 | Essential captures only | Quick orientation, short explanation, small note. |
| `중` | 6-10 | As needed for major sections | Default iiki explainer, study note, practical research page. |
| `상` | 10+ where available | Add enough for understanding and verification | Person/company/technology history, serious study, market map, complex comparison. |

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
- Capture screenshots according to the selected depth and the topic. There is no fixed maximum image count; add more screenshots when they clarify the research, support a claim, or make a person/product/project easier to understand.
- Prefer primary-source pages: official docs, official product pages, grant/application pages, original papers, or the final rendered HTML page.
- Use a desktop viewport around `1440x1000` unless the topic is specifically mobile.
- Record each screenshot in `research.md` with URL, capture date, viewport, and why it was used.
- Add a short image coverage note: what was captured, what was intentionally not captured, and what failed.
- Do not screenshot every keyword mechanically. Use images to anchor major sections.

Use the agent's Chrome/browser tool when available. If not, use:

```sh
skills/iiki-research-html/scripts/capture-chrome-screenshot.sh \
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

Start from `templates/research-page.html`. Create a single static `index.html` with semantic HTML, inline CSS, visible citations, and no build step. Use JavaScript only for small UI behavior such as mobile TOC toggling.

Keep the iiki/IYO clean-view layout contract: centered article, fixed desktop left TOC, mobile off-canvas TOC, top button, quiet white/gray wiki surface, and visible source section.

The final source section label is `출처`.

Embed useful screenshots with:

```html
<figure class="screenshot">
  <img src="assets/screenshots/01-example.png" alt="Example page screenshot captured in Chrome">
  <figcaption>Chrome screenshot of the official example page, captured YYYY-MM-DD.</figcaption>
</figure>
```

## IYO Wiki Paste Text

If the user asks for IYO Wiki paste text, wiki syntax, copy-paste wiki text, or a result that should later move into iyoxyz.com, create `iyo-wiki.txt` after the final HTML is done:

```sh
node scripts/export-iyo-wiki-text.js outputs/YYYY-MM-DD-topic-slug
```

This file is meant for copy-pasting into IYO Wiki. It converts the final HTML into WackoWiki/IYO-friendly text:

- `h1`, `h2`, `h3` become wiki headings.
- Links become `((url label))`.
- Lists, quotes, code blocks, and tables become editable wiki text.
- Screenshot figures become `{{iyoimage ...}}` placeholders with local paths and captions.

Do not treat this as a perfect upload. Image paths may need adjustment after the user uploads files to IYO Wiki.

## Typst Booklet / PDF

If the user asks for Typst, PDF, print, booklet, 소책자, 논문 같은 형식, or course notes, create a Typst booklet after the HTML is done:

```sh
node scripts/build-typst-booklet.js outputs/YYYY-MM-DD-topic-slug
```

The helper creates:

```text
outputs/YYYY-MM-DD-topic-slug/
└── typst/
    ├── iiki-booklet.typ
    ├── main.typ
    └── index.pdf
```

Use `--no-compile` only when Typst CLI is unavailable or when a caller only wants the `.typ` source. The default should compile `index.pdf`.

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
- Screenshot coverage fits topic/depth: yes/no
- IYO Wiki paste text checked: yes/no/not requested
- Typst/PDF booklet checked: yes/no/not requested
- Person profile baseline checked: yes/no/not applicable
- Overflow checked: yes/no
- Known limits:
```
