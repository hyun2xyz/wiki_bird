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
- Overflow checked: yes/no
- Known limits:
```
