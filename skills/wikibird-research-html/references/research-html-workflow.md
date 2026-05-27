# Research to HTML Workflow

## Scope

Capture topic, audience, output language, freshness needs, required sources, banned sources, and desired output path.

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
- Capture at least one Chrome screenshot for every research HTML page.
- Prefer primary-source pages: official docs, official product pages, grant/application pages, original papers, or the final rendered HTML page.
- Use a desktop viewport around `1440x1000` unless the topic is specifically mobile.
- Record each screenshot in `research.md` with URL, capture date, viewport, and why it was used.

Use the agent's Chrome/browser tool when available. If not, use:

```sh
skills/wikibird-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

Do not capture private dashboards, logged-in personal data, paid articles, payment screens, cookies, passwords, or user-sensitive pages unless the user explicitly asks and the image is safe to publish.

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

Embed useful screenshots with:

```html
<figure class="screenshot">
  <img src="assets/screenshots/01-example.png" alt="Example page screenshot captured in Chrome">
  <figcaption>Chrome screenshot of the official example page, captured YYYY-MM-DD.</figcaption>
</figure>
```

## QA

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
- Overflow checked: yes/no
- Known limits:
```
