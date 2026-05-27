---
name: wikibird-research-html
description: "Research a topic with current, source-backed information and turn it into a compact Korean wiki-style HTML page with fixed desktop TOC, mobile TOC drawer, visible sources, research notes, QA notes, and optional Typst/PDF output. Use for researched explainers, study notes, visual wiki pages, education materials, or report pages."
license: MIT
metadata:
  author: hyun2xyz
  version: "0.1.1"
---

# Wikibird Research HTML

Use this skill when the user wants a researched topic turned into a readable wiki-style artifact, especially in Korean.

## Outputs

Create this structure unless the user specifies another path:

```text
outputs/YYYY-MM-DD-topic-slug/
├── index.html
├── research.md
├── qa.md
├── assets/
│   └── screenshots/
│       └── 01-source-or-page.png
└── typst/
    ├── main.typ
    ├── index.pdf
    └── index.html
```

Typst output is optional. Produce it when the user asks for PDF, print, Typst, course notes, or document export.

## Research Rules

- Use live research for current facts, product details, people, companies, laws, prices, versions, schedules, or recommendations.
- Prefer official, primary, institutional, standards, paper, release-note, or direct-source material.
- Use secondary sources for interpretation and context, not as the sole basis for important claims.
- Record a source map and claim ledger in `research.md`.
- Capture at least one Chrome screenshot for every research HTML page, preferably from a primary source or from the rendered final page.
- Save screenshots under `assets/screenshots/` and record the URL, capture date, viewport, and purpose in `research.md`.
- Use exact dates rather than "recently" or "now".
- If sources conflict, show the conflict and avoid forced certainty.
- Never invent citations, quotes, images, dates, source titles, or access status.

## Writing Style

Write like a careful human wiki editor:

- Plain Korean by default.
- Slightly Namuwiki-adjacent, but factual and not performative.
- Short paragraph blocks.
- Explain the flow, not just isolated facts.
- Use simple analogies when they clarify the mechanism.
- Avoid AI-like filler such as "본 문서에서는", "독자 여러분", and generic motivational wrap-ups.

Default explanation flow:

1. What it is.
2. Why it matters.
3. Where it came from or what changed recently.
4. How it works.
5. Key parts or vocabulary.
6. Common misunderstandings.
7. Practical examples.
8. Current state.
9. What to watch next.
10. Sources.

## HTML Rules

Follow `references/wiki-html-style-rules.md`.

Minimum requirements:

- Self-contained `index.html` with inline CSS and small inline JS only when needed.
- Desktop TOC fixed on the left.
- Article `main` stays centered in the viewport; do not push it right to make room for the TOC.
- Desktop TOC sits farther left than the article, e.g. `left: max(16px, calc((100vw - 1500px) / 2));`.
- Desktop TOC box uses `height: fit-content`; do not set a fixed `bottom`.
- Desktop TOC bottom padding is slightly larger than top padding for optical balance.
- Mobile TOC is an off-canvas left drawer.
- Mobile transparent hamburger appears after scroll with a short fade.
- Bottom-right top button jumps to the page top.
- Key/callout boxes use very pale mint (`#f0fff9`) with soft mint border (`#b7ead8`).
- Include screenshot figures in the article body when they help the reader understand the topic. Use real `<figure>` and `<figcaption>` elements with useful `alt` text.
- Source links are visible in a final source section.

## Chrome Screenshot Rules

Use Chrome access when available. Prefer the agent's native Chrome/browser tool for authenticated, interactive, or dynamic pages. If native Chrome automation is not available but shell access is available, use `scripts/capture-chrome-screenshot.sh`.

Default screenshot contract:

- Capture at least one image for every research HTML output.
- For product, tool, website, documentation, grant, policy, or visual-reference research, capture 2-4 screenshots from the most relevant primary pages when possible.
- Save images as `assets/screenshots/01-short-name.png`, `02-short-name.png`, etc.
- Embed selected screenshots in `index.html` with `figure.screenshot`.
- Do not screenshot private dashboards, personal data, paid content, cookies, passwords, or anything the user has not asked to include.
- If screenshots cannot be captured, continue the research but document the reason in `qa.md`.

## Typst Rules

Follow `references/typst-output.md` when Typst output is requested.

Treat Typst as the PDF/print/document output, not as the replacement for the web wiki page. The HTML page remains the primary web reading surface.

## QA

Before completion:

- Render or inspect `index.html` at desktop and mobile widths when tools allow it.
- Check no horizontal overflow.
- Check desktop TOC fixed position and bottom padding.
- Check mobile hamburger visibility after scroll and drawer open behavior.
- Check visible source section.
- Check external source links when network tools allow it.
- Record results in `qa.md`.

## Resources

- `references/research-html-workflow.md`: full research-to-HTML workflow.
- `references/wiki-html-style-rules.md`: visual and editorial house style.
- `references/typst-output.md`: Typst/PDF output guidance.
- `assets/wikibird-brief.typ`: starter Typst template.
- `scripts/capture-chrome-screenshot.sh`: Chrome headless screenshot helper.
