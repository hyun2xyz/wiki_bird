---
name: wikibird-research-html
description: "Research a topic with current, source-backed information and turn it into a compact Korean wiki-style HTML page with fixed desktop TOC, mobile TOC drawer, visible sources, research notes, QA notes, and optional Typst/PDF output. Use for researched explainers, study notes, visual wiki pages, education materials, or report pages."
license: MIT
metadata:
  author: hyun2xyz
  version: "0.1.3"
---

# Wikibird Research HTML

Use this skill when the user wants a researched topic turned into a readable wiki-style artifact, especially in Korean.

## Activation Voice

When this skill is active, every assistant conversational reply to the user must end with `짹`.

Examples:

- `정리해 드릴게요 짹`
- `완료했습니다 짹`

Do not add `짹` inside code blocks, file contents, source titles, quotes, citations, or generated article body unless the user explicitly asks for that artifact itself to use the bird voice.

## User Settings

Accept these optional user settings in Korean or English. If the user does not specify a setting, use the default.

| Setting | Values | Default | Meaning |
| --- | --- | --- | --- |
| `리서치 깊이` / `research depth` | `하`, `중`, `상` | `중` | Controls source count, detail level, image coverage, and QA strictness. |

On first activation or after a fresh install, ask the user to choose a default research depth before starting the first research task when the flow allows it:

```text
리서치 깊이를 기본값으로 정해둘까요? 하/중/상 중에서 고르면 됩니다.
하: 빠른 개요, 중: 일반 Wikibird 문서, 상: 공부용 깊은 조사입니다.
```

If the user gives a clear immediate task and does not answer the setup question, proceed with `중` for that task and mention that they can change the depth next time.

Depth rules:

- `하`: quick wiki note. Use about 3-5 reliable sources, essential screenshots when useful, and a compact page with the essential flow only.
- `중`: normal Wikibird output. Use about 6-10 sources, screenshots for major sections as needed, a source map, claim ledger, timeline/table when useful, and a complete source section.
- `상`: deep study output. Use 10+ sources where available, add enough screenshots or visual figures for understanding and verification, stronger cross-checking, richer timeline/context, common misunderstandings, and a more explicit claim ledger.

When the user says "가볍게", "짧게", or "빠르게", treat it as `하`. When the user says "쭉", "제대로", "공부용", "깊게", "상세히", or asks about a person/company/technology history, prefer `중` or `상` depending on scope.

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
- Apply the selected `리서치 깊이` before gathering sources. Record the chosen depth in `research.md`.
- Add an image coverage note to `research.md`: which screenshots were captured, which important visual sources were skipped, and why.
- Record a source map and claim ledger in `research.md`.
- Capture at least one Chrome screenshot for every research HTML page, preferably from a primary source or from the rendered final page.
- Save screenshots under `assets/screenshots/` and record the URL, capture date, viewport, and purpose in `research.md`.
- Use exact dates rather than "recently" or "now".
- If sources conflict, show the conflict and avoid forced certainty.
- Never invent citations, quotes, images, dates, source titles, or access status.

## People / Profile Research

When researching a person, do not only summarize their ideas or projects. Build a basic profile first:

- Full name, common name, occupation/role, and why they matter.
- Birth date or age, birthplace, nationality/background, and education when reliable public sources support it.
- Current affiliation and major career timeline.
- Public face/appearance reference when safe and available: prefer an official bio page, personal site, university/company profile, conference page, or other reputable public page shown as a Chrome screenshot. Do not scrape private social photos or private personal data.
- Representative work images: official project page, paper/course page, company/product page, lecture page, or public talk page.
- If a basic profile fact is unavailable or conflicts across sources, say so plainly instead of filling the gap.

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
- `h1` uses the Korean gothic/system sans stack, not a serif title font. Use a slightly smaller scale and open line-height so long Korean/English mixed titles do not look cramped. A good default is `font-size: clamp(30px, 3.4vw, 42px); line-height: 1.18;`.
- Key/callout blocks use a quiet left border, like an editorial note. Do not use full mint box backgrounds for the main summary/caption block.
- Korean prose uses word-based wrapping: `word-break: keep-all`, `overflow-wrap: break-word`, and `hyphens: auto`. Links keep word-based wrapping; code and long tokens may use stronger breaking.
- Section body content is slightly indented under the heading line. Headings stay aligned; direct section children such as paragraphs, lists, key notes, figures, tables, timelines, and flow blocks get about `10px` left offset, reset on mobile.
- Include screenshot figures in the article body when they help the reader understand the topic. Use real `<figure>` and `<figcaption>` elements with useful `alt` text.
- Source links are visible in a final source section titled `출처`.
- Include a small link back to the local root `index.html` on generated wiki pages when the relative path is known.
- After creating or updating a research output under `outputs/`, refresh the local root index with `node scripts/build-index.js`.

## Chrome Screenshot Rules

Use Chrome access when available. Prefer the agent's native Chrome/browser tool for authenticated, interactive, or dynamic pages. If native Chrome automation is not available but shell access is available, use `scripts/capture-chrome-screenshot.sh`.

Default screenshot contract:

- Capture at least one image for every research HTML output.
- Match screenshot coverage to the topic and research depth. There is no fixed maximum image count; add more screenshots when they clarify the research, support a claim, or make a person/product/project easier to understand.
- For product, tool, website, documentation, grant, policy, person, place, book, course, or visual-reference research, capture the most relevant primary pages when possible.
- For person research, include at least one visual/profile source and at least one representative work/source page when available.
- Do not screenshot every keyword mechanically. Prefer screenshots that anchor major sections: profile, timeline, official source, representative work, comparison surface, or final render.
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
- Check selected depth is recorded and screenshot coverage fits the topic and chosen depth.
- For people, check basic profile fields and public visual/profile evidence are included or explicitly marked unavailable.
- Record results in `qa.md`.

## Resources

- `references/research-html-workflow.md`: full research-to-HTML workflow.
- `references/wiki-html-style-rules.md`: visual and editorial house style.
- `references/typst-output.md`: Typst/PDF output guidance.
- `assets/wikibird-brief.typ`: starter Typst template.
- `scripts/capture-chrome-screenshot.sh`: Chrome headless screenshot helper.
