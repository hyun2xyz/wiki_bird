#let wikibird-brief(title: "", meta: "", body) = [
  #set page(
    paper: "a4",
    margin: (x: 20mm, y: 22mm),
    numbering: "1",
  )
  #set text(
    font: ("Apple SD Gothic Neo", "Noto Sans KR", "Arial Unicode MS"),
    size: 10.5pt,
    lang: "ko",
  )
  #set par(justify: true, leading: 0.65em)

  #heading(level: 1, numbering: none)[#title]
  #text(size: 8.5pt, fill: rgb("#62676d"))[#meta]

  #body
]

#let source(title, url, note: "checked YYYY-MM-DD") = [
  - #link(url)[#title], #note.
]
