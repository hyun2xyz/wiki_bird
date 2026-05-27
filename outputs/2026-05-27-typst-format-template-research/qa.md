# QA

- Rendered locally: yes
- Desktop layout checked: yes, 1440x1000
- Mobile layout checked: yes, 390x844
- Links checked: yes, 9 unique external source links returned 200
- Citation section present: yes
- Desktop left TOC checked: yes, `.toc` computed as `position: fixed`
- Desktop TOC content-height checked: yes, TOC box height 388px for 386px scroll height
- Top button checked: yes, `.top-button` present
- Mobile TOC drawer checked: yes, `.toc` off-canvas by default and opens after hamburger click
- Mobile hamburger dissolve checked: yes, opacity 0 at top and opacity 1 after scroll
- Overflow checked: yes, no horizontal overflow on desktop or mobile
- Typst source compiled: yes, `typst/main.typ`
- Typst HTML compiled: yes, `typst/index.html`
- Typst PDF compiled: yes, `typst/index.pdf`
- Known limits:
  - This remains research-focused. The `.typ` version is a first working document output, not a full production Typst package.
  - Typst Universe changes frequently, so specific template recommendations should be refreshed before adoption.
  - Typst HTML export in Typst 0.14.2 is marked as incomplete by the compiler, so the PDF is the more reliable Typst output.
