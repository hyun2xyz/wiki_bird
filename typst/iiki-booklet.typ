#let iiki-booklet(body, title: "", subtitle: "") = [
  #set page(
    paper: "a5",
    margin: (top: 18mm, bottom: 20mm, x: 16mm),
    numbering: "1",
  )
  #set text(
    font: ("Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", "Arial Unicode MS"),
    lang: "ko",
    size: 9.5pt,
  )
  #set par(
    first-line-indent: 0.8em,
    justify: true,
    leading: 0.62em,
  )
  #show heading: set block(above: 1.3em, below: 0.65em)
  #show heading.where(level: 1): it => [
    #pagebreak(weak: true)
    #block(stroke: (bottom: 0.7pt + luma(62%)), inset: (bottom: 5pt))[
      #text(size: 14pt, weight: "bold")[#it.body]
    ]
  ]
  #show heading.where(level: 2): it => [
    #text(size: 11pt, weight: "bold")[#it.body]
  ]
  #show table: set text(size: 8.2pt)
  #show raw: set text(font: "Menlo", size: 7.5pt)
  #show figure.caption: set text(size: 7.5pt, fill: luma(42%))

  #align(center)[
    #v(16mm)
    #text(size: 22pt, weight: "bold")[#title]
    #v(4mm)
    #text(size: 8.5pt, fill: luma(42%))[#subtitle]
    #v(10mm)
    #line(length: 42mm, stroke: 0.6pt + luma(65%))
    #v(8mm)
    #text(size: 8pt, fill: luma(45%))[iiki research booklet]
  ]
  #pagebreak()

  #body
]
