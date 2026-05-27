#import "/typst/wikibird-brief.typ": wikibird-brief, source

#show: doc => wikibird-brief(
  title: "Typst 형식과 템플릿 조사",
  meta: "Wikibird 리서치 결과를 Typst/PDF 출력으로 확장할 수 있는지 보기 위한 조사. Typst판. 자료 확인일: 2026-05-27.",
  doc,
)

= 한 줄 결론

Typst는 우리 HTML 위키를 바로 대체하기보다는, 같은 리서치 내용을 PDF/인쇄/강의자료로 뽑는 두 번째 출력 형식으로 붙이는 게 좋아 보인다.

HTML은 웹에서 읽기 좋고, 좌측 고정 목차 같은 인터랙션을 직접 다룰 수 있다. Typst는 조판, PDF, 논문/보고서/강의노트 같은 문서로 완성된 형태에 강하다. 역할이 다르다.

== 우리식으로 말하면

HTML은 위키 페이지, Typst는 정리본 PDF다. 같은 리서치를 두 번 쓰는 게 아니라, 하나의 내용에서 웹용과 문서용을 나눠 뽑는 방향이 맞다.

= Typst가 뭔가

- 종류: markup 기반 조판 시스템
- 비교 대상: LaTeX, Word, Google Docs, Markdown + PDF 변환
- 강점: 빠른 컴파일, 읽기 쉬운 문법, 수식/참고문헌/레이아웃 제어, 템플릿화
- 주요 출력: PDF, PNG, SVG, HTML
- 최신 확인: 공식 changelog 기준 0.14.2가 2025-12-12에 공개됨

Typst는 Markdown처럼 쓰기 시작할 수 있는데, LaTeX처럼 문서 구조와 조판을 깊게 만질 수 있는 도구에 가깝다. 공식 문서는 Typst를 과학 문서용 markup-based typesetting system으로 설명하고, LaTeX 같은 고급 도구와 Word/Google Docs 같은 단순 도구 사이의 대안으로 놓는다.

= Typst 문서 형식

Typst 문서는 기본적으로 가볍게 시작한다. 제목은 등호, 목록은 하이픈이나 플러스, 함수 호출은 `#`으로 들어간다.

```typst
= Typst 조사 정리

리서치 결과를 문서로 정리한다.

== 핵심

- HTML은 웹용이다.
- Typst는 PDF와 인쇄용으로 좋다.

#set text(size: 11pt)
#show heading: set text(weight: "bold")

$ E = m c^2 $
```

공식 syntax reference 기준으로 Typst에는 세 가지 모드가 있다.

- Markup: 기본 글쓰기. `= 제목`, `- 목록` 같은 문법을 쓴다.
- Math: 수식. `$x^2$`처럼 쓴다.
- Code: 함수, 변수, 조건, 스타일. `#let`, `#show`, `#set`이 여기에 들어간다.

= 템플릿 구조

Typst에서 템플릿은 대체로 문서 전체를 감싸는 함수라고 보면 된다. 공식 튜토리얼도 템플릿을 함수로 만들고, `#show` 규칙으로 전체 문서에 씌우는 식으로 설명한다.

```typst
#let wiki-brief(title: "Untitled", sources: (), body) = [
  #set page(paper: "a4", margin: 22mm)
  #set text(font: "Noto Sans CJK KR", size: 10.5pt)

  = #title
  #body

  == 참고한 자료
  #for source in sources [
    - #source
  ]
]

#show: doc => wiki-brief(
  title: "Typst 형식과 템플릿 조사",
  sources: ("Typst Docs", "Typst Universe"),
  doc,
)
```

이 구조의 장점은 본문과 스타일을 분리할 수 있다는 점이다. 리서치 내용은 본문에 두고, 제목/여백/폰트/출처/목차 같은 반복 요소는 템플릿 함수로 넘긴다.

= typst.toml

템플릿을 반복해서 쓸 거면 패키지로 관리하는 편이 낫다. Typst 패키지는 루트에 `typst.toml` manifest를 둔다.

```toml
[package]
name = "wikibird-brief"
version = "0.1.0"
entrypoint = "lib.typ"
authors = ["Wikibird"]
license = "MIT"
description = "Research brief with wiki-style structure."
categories = ["report"]
compiler = "0.14.2"

[template]
path = "template"
entrypoint = "main.typ"
thumbnail = "thumbnail.png"
```

공식 manifest 문서 기준으로 컴파일러가 기본적으로 요구하는 것은 `name`, `version`, `entrypoint`다. 템플릿 패키지라면 `[template]` 섹션에 복사될 템플릿 폴더와 시작 파일을 지정한다.

= 템플릿 생태계

Typst Universe는 공개 패키지와 템플릿 갤러리다. 공식 Universe 검색 기준으로 CV, presentation, paper, thesis, book, report, poster, flyer, office 같은 범주가 있다.

하지만 Universe 템플릿을 그대로 쓰는 건 조심해야 한다. 우리 HTML은 나무위키식 흐름, 좌측 목차, 출처 섹션, 리서치 노트가 핵심이다. 공개 템플릿은 대부분 특정 학회, 학교, 이력서, 발표 용도에 맞춰져 있다. 참고는 하되, 기본은 우리 템플릿을 따로 만드는 쪽이 맞다.

= Wikibird에 붙이면

구조는 이렇게 잡는 게 제일 단순하다.

1. Research: 웹 조사, source map, claim ledger를 만든다.
2. Wiki HTML: 현재처럼 좌측 목차형 HTML을 만든다. 웹에서 읽는 기준본이다.
3. Typst Brief: 같은 내용을 PDF/프린트용 Typst 문서로 변환한다.
4. Template: 반복되면 `wikibird-brief` 템플릿으로 묶는다.

중요한 판단은 원본을 어디에 둘 것인가다. 지금은 HTML을 직접 생성한다. Typst까지 붙이면 원본을 Markdown/JSON/structured notes 쪽으로 두고, HTML과 Typst를 각각 렌더링하는 방식이 더 안정적이다.

= 주의할 점

- HTML과 Typst는 목표가 다르다. 좌측 고정 목차 웹페이지는 HTML/CSS가 맞다.
- 패키지 버전 고정이 중요하다. Typst 패키지는 `@preview/name:version`처럼 버전을 명시해서 가져온다.
- 템플릿 이름은 신중해야 한다. 공개할 거면 `wikibird-brief`처럼 고유 이름을 써야 한다.
- 최신 버전 확인이 필요하다. 0.14.2는 WebAssembly runtime 보안 업데이트 때문에 로컬 사용자에게 업그레이드를 권장한다.
- 한글 폰트 확인이 필요하다. PDF 출력에서는 시스템/서버에 어떤 한글 폰트가 있는지가 결과 품질에 바로 영향을 준다.

= 추천 방향

지금 단계에서는 Typst 템플릿을 크게 만들 필요 없다.

1. 기존 HTML 산출물 하나를 골라 같은 내용의 `brief.typ`를 손으로 만든다.
2. 반복되는 요소를 `lib.typ`의 `wiki-brief()` 함수로 빼낸다.
3. 출처, 목차, 요약, 표, 코드블록이 안정적으로 나오는지 본다.
4. 쓸 만하면 `typst.toml`을 추가하고 로컬 패키지처럼 관리한다.
5. 나중에 공유할 필요가 생기면 Universe 공개 템플릿 규칙을 맞춘다.

= 참고한 자료

#source("Typst Documentation overview", "https://typst.app/docs/")
#source("Typst Syntax reference", "https://typst.app/docs/reference/syntax/")
#source("Making a Template, Typst tutorial", "https://typst.app/docs/tutorial/making-a-template/")
#source("Typst Universe", "https://typst.app/universe/")
#source("Typst Universe template search", "https://typst.app/universe/search/?kind=templates")
#source("Private Packages, Typst Documentation", "https://typst.app/docs/web-app/private-packages/")
#source("Typst packages manifest documentation", "https://raw.githubusercontent.com/typst/packages/main/docs/manifest.md")
#source("Typst 0.14.2 changelog", "https://typst.app/docs/changelog/0.14.2/", note: "2025-12-12, checked 2026-05-27")
#source("Typst Open Source", "https://typst.app/open-source/")
