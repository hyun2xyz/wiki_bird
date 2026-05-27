# Wiki HTML Style Rules

Use `ex.html` as the visual and structural reference. The target is a compact, readable Korean wiki page: factual, easy to scan, and closer to Namuwiki-style explanation than AI essay prose.

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
- On desktop, keep the table of contents fixed on the left while the article scrolls.
- The desktop TOC box should end directly after the last TOC item. Do not stretch it to the bottom of the viewport unless the TOC is taller than the viewport.
- Add a fixed bottom-right top button that jumps to the page top.
- On mobile, hide the TOC in an off-canvas left drawer. After the reader scrolls down, show a transparent hamburger button at top-left with a short fade/dissolve transition. Tapping it opens the TOC.
- Keep body width moderate. The page should feel like a readable article, not a wide dashboard.

## Layout Defaults

- Body font: Korean system sans-serif.
- Body size: around `16px`.
- Body line height: around `1.7`.
- Article max width: around `820-900px`.
- Desktop left TOC width: around `240-280px`.
- Desktop TOC: `position: fixed`, `top` set, no fixed `bottom`, and `max-height` constrained to the viewport.
- Use simple borders and light gray surfaces.
- Avoid decorative gradients, card-heavy layouts, and marketing-style sections.
- Use cards only for repeated comparison items or source boxes.

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

## Citation Style

Use a final section:

```html
<h2 id="sources">참고한 자료</h2>
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
- Current facts have exact dates or source freshness notes.
