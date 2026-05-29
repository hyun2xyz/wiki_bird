# Typst Output

Typst is the PDF/print/document output. HTML remains the primary web wiki page.

## When To Use

Create Typst output when the user asks for:

- PDF
- print
- document export
- course notes
- Typst
- offline handout
- booklet / zine / 소책자
- 논문 같은 형식

## File Structure

```text
outputs/YYYY-MM-DD-topic-slug/
└── typst/
    ├── iiki-booklet.typ
    ├── main.typ
    └── index.pdf
```

## Booklet Template

Use `assets/iiki-booklet.typ` or the shared repo template at `typst/iiki-booklet.typ` for paper-like booklet output.

The default booklet is A5, compact, source-backed, and closer to a small paper or study booklet than a slide deck. Keep the HTML page as the primary web surface, then derive the Typst/PDF from that final page.

The PDF should read like an edited document, not a printout of translated notes. Keep section openings explanatory, preserve source-backed claims, and avoid casual commentary unless the user explicitly asks for it.

`assets/iiki-brief.typ` and `typst/iiki-brief.typ` remain available for short one-page briefs.

## Compile

From the repository root:

```sh
node scripts/build-typst-booklet.js outputs/<slug>
```

The helper writes `typst/main.typ`, copies `typst/iiki-booklet.typ`, and compiles `typst/index.pdf` when the Typst CLI is available.

Use this only when `.typ` source is needed without compiling:

```sh
node scripts/build-typst-booklet.js outputs/<slug> --no-compile
```

Manual compile remains possible:

```sh
typst compile outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.pdf
```

Typst HTML export is not part of the default iiki contract. Treat PDF as the stable Typst output.
