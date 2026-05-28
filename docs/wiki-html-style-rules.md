# Wiki HTML Style Rules

Use this document as the visual and structural reference. The target is a compact, readable Korean wiki page: factual, easy to scan, and closer to Namuwiki-style explanation than AI essay prose.

## Default Output

When the user asks for research, produce a static HTML page in this style:

```text
outputs/YYYY-MM-DD-topic-slug/
├── index.html
├── research.md
└── qa.md
```

`index.html` should be self-contained unless the user provides images or assets.

## Page Shape

- Use a wiki document structure, not a landing page.
- Put the topic name in `h1`.
- Put a short meta line under the title: source freshness, document purpose, or revision date.
- Use numbered `h2` and `h3` headings.
- Include a visible `nav.toc` table of contents.
- If TOC link text already includes heading numbers, remove browser list numbering with `list-style: none`; do not show duplicate numbers like `1. 1. 제목`.
- On desktop, keep the table of contents fixed on the left while the article scrolls.
- Keep the article itself centered in the viewport. Do not offset `main` to compensate for the TOC.
- The desktop TOC box should end directly after the last TOC item. Do not stretch it to the bottom of the viewport unless the TOC is taller than the viewport.
- Add a fixed bottom-right top button that jumps to the page top.
- On mobile, hide the TOC in an off-canvas left drawer. After the reader scrolls down, show a transparent hamburger button at top-left with a short fade/dissolve transition. Tapping it opens the TOC.
- Keep body width moderate. The page should feel like a readable article, not a wide dashboard.
- Include Chrome-captured screenshots when the topic has a visible web/product/source surface.

## Layout Defaults

- Body font: Korean system sans-serif.
- Body size: around `16px`.
- Body line height: around `1.7`.
- Article max width: around `820-900px`.
- `h1` should use the same Korean gothic/system sans stack as the body, not a serif title font. Keep it readable on two lines with `clamp(30px, 3.4vw, 42px)` and `line-height: 1.18`.
- Desktop left TOC width: around `240-280px`.
- Desktop TOC: `position: fixed`, `top` set, no fixed `bottom`, `height: fit-content`, and slightly larger bottom padding than top padding for optical balance. Use `max-height` only as a fallback for very long TOCs.
- Desktop TOC should sit farther left than the centered article. A good default is `left: max(16px, calc((100vw - 1500px) / 2));`.
- TOC lists should use either browser-generated numbers or numbers in the link text, not both. For Wikibird's numbered heading text, use `list-style: none; padding-left: 0;`.
- In the TOC, color only the section number blue and keep the section title black. Use spans such as `<span class="toc-num">1.</span> <span class="toc-title">Title</span>`, and apply underline styling to the spans rather than the parent anchor.
- Callout/key blocks should use a quiet left-border note style, not a full tinted box. Keep mint only for rare highlights that need stronger emphasis.
- Korean prose should break by word, not by arbitrary syllable. Use `word-break: keep-all`, `overflow-wrap: break-word`, and `hyphens: auto` on normal text. Keep stronger breaking only for code or unusually long tokens.
- Indent section body content slightly under the heading line. Keep headings aligned, but give direct section children such as paragraphs, lists, key notes, figures, tables, timelines, and flow blocks about `10px` of left offset. Reset that offset on mobile.
- Use simple borders and light gray surfaces.
- Avoid decorative gradients, card-heavy layouts, and marketing-style sections.
- Use cards only for repeated comparison items or source boxes.

## Screenshot Figures

- Save screenshots under `assets/screenshots/`.
- Use screenshots as evidence or orientation, not decoration.
- Use full-width figures inside the article flow.
- Give every screenshot useful `alt` text.
- Captions should say what was captured, from where, and the capture date.
- Keep screenshots readable. Avoid dark, blurred, tiny, or heavily cropped captures unless the crop is intentional.

Default CSS:

```css
.screenshot {
  margin: 24px 0 30px;
}

.screenshot img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--line);
  background: #fff;
}

.screenshot figcaption {
  margin-top: 8px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}
```

## Key Note Blocks

Use this for the main one-line conclusion or "우리식으로 말하면" block:

```css
.key {
  border: 0;
  border-left: 3px solid var(--soft-line);
  background: transparent;
  padding: 0 0 0 18px;
  margin: 22px 0 26px;
}
```

## Text Wrapping And Body Indent

Default prose wrapping:

```css
main {
  overflow-wrap: break-word;
  word-break: keep-all;
  hyphens: auto;
  -webkit-hyphens: auto;
}

p, li, figcaption {
  max-width: 100%;
  word-break: keep-all;
  overflow-wrap: break-word;
  hyphens: auto;
  -webkit-hyphens: auto;
}

a {
  overflow-wrap: break-word;
  word-break: keep-all;
}

code {
  overflow-wrap: anywhere;
  word-break: break-word;
}
```

Default section body offset:

```css
section > p,
section > ul,
section > ol,
section > .key,
section > .key-box,
section > .infobox,
section > .book-figure,
section > .screenshot,
section > .flow,
section > .timeline,
section > .table-wrap,
section > pre {
  margin-left: 10px;
  width: calc(100% - 10px);
}
```

## Writing Tone

Write like a careful human wiki editor:

- Direct, plain Korean.
- Slightly conversational when it helps understanding.
- No AI disclaimer tone.
- No "이번 글에서는", "이 글은 ~합니다" filler unless useful.
- No motivational wrap-up.
- Prefer concrete nouns and verbs.
- Explain unfamiliar concepts with simple analogies, then return to the actual mechanism.
- Keep paragraph blocks short.

Good tone:

```text
핵심은 여기다. HTML은 화면을 예쁘게 만드는 언어가 아니라, 문서의 구조를 브라우저에게 알려주는 언어다.
```

Avoid:

```text
본 문서에서는 HTML의 다양한 측면을 종합적으로 살펴보고, 이를 통해 독자 여러분의 이해를 돕고자 합니다.
```

## Research Rules

- Use relatively recent information by default.
- For volatile facts, verify live sources before writing.
- Prefer official documents, primary sources, papers, release notes, filings, standards, or direct announcements.
- Use news and blogs for context, not as the only evidence for important claims.
- Use exact dates rather than "recently", "nowadays", or "currently" when possible.
- If sources conflict, show the conflict instead of forcing one clean answer.
- Separate facts from interpretation.
- Keep all source links visible in the source section.

## Explanation Flow

A research page should teach the flow, not just list facts.

Default order:

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

For comparison topics:

1. One-line conclusion.
2. Comparison table.
3. When to choose each option.
4. Details by option.
5. Caveats.
6. Sources.

## HTML Requirements

- Use semantic tags: `main`, `header`, `nav`, `section`, `figure`, `figcaption`, `footer`.
- Add stable `id` values to headings so the TOC links work.
- Keep CSS in the same file by default.
- Do not require JavaScript for basic reading.
- Images need useful `alt` text unless purely decorative.
- Tables must not overflow on mobile; wrap them in a scroll container if needed.
- Source links must be real links, not plain text.
- Every generated wiki page should include a small link back to the local root `index.html` when the relative path is known.

## Citation Style

Use a final section:

```html
<h2 id="sources">출처</h2>
<ul>
  <li><a href="...">Source title</a>, publisher, date checked YYYY-MM-DD.</li>
</ul>
```

In body text, cite lightly. Do not make every sentence unreadable with citation noise.

## QA Checklist

Before calling the page done:

- Desktop layout checked.
- Mobile layout checked.
- Left TOC fixed on desktop.
- TOC returns to normal flow on mobile.
- Heading links work.
- Text does not overlap or overflow.
- Source section exists.
- Screenshot figures exist when a visual/source capture is useful.
- Current facts have exact dates or source freshness notes.
