# Wiki HTML Style Rules

The target is a compact, readable wiki page: factual, easy to scan, and closer to a careful Namuwiki-style explainer than an AI essay.

## Canonical Template

- Start new research pages from `templates/research-page.html`.
- Copy the template first, then replace placeholders, expand the TOC, and add sections.
- Do not start from a blank HTML file or a new visual concept unless the user explicitly asks for a different design.
- By default, do not put the mini wiki bird image at the top of ordinary research pages. Keep that image for README/manual/brand examples.
- Keep this style compatible with the IYO Wiki clean-view direction: centered article, desktop fixed left TOC, mobile off-canvas TOC, bottom-right top button, quiet white/gray wiki surface, and visible source section.

## Page Shape

- Use a wiki document structure, not a landing page.
- Put the topic name in `h1`.
- Put a short meta line under the title.
- Keep `h1` in the Korean gothic/system sans stack, not a serif title font. Make it readable when it wraps with `clamp(30px, 3.4vw, 42px)` and `line-height: 1.18`.
- Use numbered `h2` and `h3` headings.
- Include a visible `nav.toc` table of contents.
- If TOC link text already includes heading numbers, remove browser list numbering with `list-style: none`; do not show duplicate numbers like `1. 1. 제목`.
- Keep body width around `820-900px`.
- Keep `main` centered with `margin: 0 auto`; do not offset the article for the desktop TOC.
- Use word-based Korean wrapping for prose: `word-break: keep-all`, `overflow-wrap: break-word`, and `hyphens: auto`. Reserve `overflow-wrap: anywhere` for code or unusually long tokens.
- Keep headings aligned, but indent direct section body content about `10px` so the text block sits slightly under the heading.

## Desktop TOC

- Use `position: fixed`.
- Set `top`.
- Place it farther left than the centered article. A good default is `left: max(16px, calc((100vw - 1500px) / 2));`.
- Do not set a fixed `bottom`.
- Use `height: fit-content`.
- Use `max-height` only as a fallback for very long TOCs.
- Use slightly larger bottom padding than top padding for optical balance.
- A good default is `padding: 14px 16px 18px`.
- TOC lists should use either browser-generated numbers or numbers in the link text, not both. For iiki's numbered heading text, use `list-style: none; padding-left: 0;`.
- In the TOC, color only the section number blue and keep the section title black. Use spans such as `<span class="toc-num">1.</span> <span class="toc-title">Title</span>`, and apply underline styling to the spans rather than the parent anchor.

## Mobile TOC

- Hide the TOC in an off-canvas left drawer.
- After scroll, show a transparent top-left hamburger with a short fade.
- Clicking the hamburger opens the TOC drawer.
- Clicking a TOC link or backdrop closes it.

## Screenshot Figures

- Save Chrome screenshots under `assets/screenshots/`.
- Include at least one screenshot figure for research HTML pages when Chrome capture is available.
- Use screenshots as evidence or orientation, not decoration.
- Use useful `alt` text and a caption with source, capture date, and context.

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

## Callouts

Use a quiet left-border note style for the main summary/caption block:

```css
.key {
  border: 0;
  border-left: 3px solid var(--soft-line);
  background: transparent;
  padding: 0 0 0 18px;
  margin: 22px 0 26px;
}
```

## Text Wrapping And Section Indent

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

Default body offset:

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

## Tone

- Direct, plain Korean.
- Slightly conversational where it helps.
- No AI disclaimer tone.
- No generic "이번 글에서는" filler.
- Prefer concrete nouns and verbs.
- Keep paragraphs short.
- Avoid source-by-source translation. Rewrite the material into a Korean reading path: definition, context, mechanism, consequence, and caveat when needed.
- Add enough explanation that a reader can understand why a fact matters, not only that the fact exists.
- Keep the voice factual. Do not add diary-like comments, private feelings, or loose opinions unless the user asks for that mode.
- Put a short explanatory paragraph before dense lists, timelines, or tables so they do not feel like copied notes.

## Sources

Use a final source section with real links:

```html
<h2 id="sources">출처</h2>
<ul>
  <li><a href="...">Source title</a>, publisher/date, checked YYYY-MM-DD.</li>
</ul>
```
