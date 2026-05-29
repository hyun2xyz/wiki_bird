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

## File Structure

```text
outputs/YYYY-MM-DD-topic-slug/
└── typst/
    ├── main.typ
    ├── index.pdf
    └── index.html
```

## Template

Use `assets/iiki-brief.typ` as the starter template. If the repo already has `typst/iiki-brief.typ`, use that shared template instead.

## Compile

From the repository root:

```sh
typst compile --root . outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.pdf
typst compile --root . --features html outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.html
```

Typst HTML export may be incomplete depending on the Typst version. Treat PDF as the stable Typst output and HTML as an experimental preview.
