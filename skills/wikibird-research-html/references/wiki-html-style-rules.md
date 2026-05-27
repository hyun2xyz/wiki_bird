# Wiki HTML Style Rules

The target is a compact, readable wiki page: factual, easy to scan, and closer to a careful Namuwiki-style explainer than an AI essay.

## Page Shape

- Use a wiki document structure, not a landing page.
- Put the topic name in `h1`.
- Put a short meta line under the title.
- Use numbered `h2` and `h3` headings.
- Include a visible `nav.toc` table of contents.
- Keep body width around `820-900px`.
- Keep `main` centered with `margin: 0 auto`; do not offset the article for the desktop TOC.

## Desktop TOC

- Use `position: fixed`.
- Set `top`.
- Place it farther left than the centered article. A good default is `left: max(16px, calc((100vw - 1320px) / 2));`.
- Do not set a fixed `bottom`.
- Use `height: fit-content`.
- Use `max-height` only as a fallback for very long TOCs.
- Use slightly larger bottom padding than top padding for optical balance.
- A good default is `padding: 14px 16px 18px`.

## Mobile TOC

- Hide the TOC in an off-canvas left drawer.
- After scroll, show a transparent top-left hamburger with a short fade.
- Clicking the hamburger opens the TOC drawer.
- Clicking a TOC link or backdrop closes it.

## Callouts

Use very pale mint, not yellow:

```css
--mark: #f0fff9;
--mark-line: #b7ead8;
```

Callout CSS:

```css
.key {
  background: var(--mark);
  border: 1px solid var(--mark-line);
  padding: 12px 14px;
  margin: 22px 0;
}
```

## Tone

- Direct, plain Korean.
- Slightly conversational where it helps.
- No AI disclaimer tone.
- No generic "이번 글에서는" filler.
- Prefer concrete nouns and verbs.
- Keep paragraphs short.

## Sources

Use a final source section with real links:

```html
<h2 id="sources">참고한 자료</h2>
<ul>
  <li><a href="...">Source title</a>, publisher/date, checked YYYY-MM-DD.</li>
</ul>
```
