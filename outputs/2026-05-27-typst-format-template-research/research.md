# Research Notes: Typst format and templates

조사일: 2026-05-27  
주제: Wikibird 리서치 산출물을 HTML뿐 아니라 Typst 형식으로도 만들 수 있을지 검토하기 위한 기초 조사

## Source Map

| Source | Type | Freshness | Why it matters | Key claim |
| --- | --- | --- | --- | --- |
| Typst Documentation overview | Official docs | Checked 2026-05-27 | Typst의 기본 성격 확인 | Typst는 markup 기반 typesetting system이며 LaTeX와 Word/Google Docs 사이의 대안으로 설명된다. |
| Typst syntax reference | Official docs | Checked 2026-05-27 | 문서 형식의 기본 문법 확인 | Markup, math, code 세 모드가 있고 `= Heading`, `- item`, `#function()` 같은 단순 문법을 쓴다. |
| Making a Template tutorial | Official docs | Checked 2026-05-27 | 템플릿 작성 방식 확인 | Typst 템플릿은 문서를 감싸는 함수이며 `#show: ...` 규칙으로 전체 문서에 적용한다. |
| Typst Universe | Official package/template gallery | Checked 2026-05-27 | 공개 템플릿 생태계 확인 | CV, presentation, paper, thesis, book, report 등 범주별 템플릿이 존재한다. |
| Private Packages docs | Official docs | Checked 2026-05-27 | 팀 내부 템플릿 운영 방식 확인 | private packages/templates는 `@local/name:version` 방식으로 공유 가능하고 `typst.toml`에서 template 설정을 쓴다. |
| Typst packages manifest docs | Official GitHub docs | Checked 2026-05-27 | 패키지/템플릿 배포 구조 확인 | `typst.toml`의 `[package]`, `[template]` 섹션과 entrypoint/path/thumbnail 규칙이 핵심이다. |
| Typst 0.14.2 changelog | Official docs | 2025-12-12, checked 2026-05-27 | 최신 버전/주의점 확인 | 0.14.2는 WebAssembly runtime 보안 업데이트 때문에 특히 로컬 사용자에게 업그레이드가 권장된다. |
| Typst Open Source page | Official docs | Checked 2026-05-27 | 라이브러리/상용 사용 가능성 확인 | Typst compiler는 Apache-2.0 라이선스 Rust crate로 애플리케이션에 임베드할 수 있다. |

## Claim Ledger

| Claim | Confidence | Evidence | Notes |
| --- | --- | --- | --- |
| Typst는 Markdown보다 강하고 LaTeX보다 읽기 쉬운 쪽을 노린 문서 조판 언어다. | High | Typst overview, syntax reference | 공식 문서의 포지셔닝과 문법 구조 기준. |
| 템플릿은 보통 함수로 만들고 `#show` 규칙으로 문서 전체에 씌운다. | High | Making a Template tutorial | Wikibird의 article wrapper로 옮기기 쉬운 구조. |
| 공개 템플릿은 Universe에서 찾고, 내부 템플릿은 private package 또는 로컬 패키지로 관리하는 구조다. | High | Universe, Private Packages docs, manifest docs | 공개/비공개 운영 경로가 분리되어 있다. |
| 템플릿 패키지의 핵심 파일은 `typst.toml`, `lib.typ`, `template/main.typ`, README, LICENSE다. | High | packages manifest docs | 실제 구조는 패키지마다 다를 수 있지만 기본 방향은 명확하다. |
| Wikibird에는 Typst를 HTML 대체재라기보다 PDF/print/export용 추가 출력층으로 붙이는 편이 좋다. | Medium | Inference from Typst goals and HTML export state | HTML 웹 위키는 현재 우리 HTML이 더 직접적이고, Typst는 PDF/문서 배포에 강하다. |

## Synthesis Direction

이 페이지는 Typst를 “지금 당장 우리 HTML을 대체할 것인가”가 아니라 “Wikibird가 PDF/문서 출력을 추가할 때 어떤 구조가 맞는가”라는 관점으로 정리한다.

추천 흐름:

1. HTML은 계속 웹 위키 결과물의 기준으로 둔다.
2. Typst는 같은 리서치 데이터를 PDF/프린트용으로 뽑는 두 번째 출력층으로 본다.
3. 템플릿은 공개 Universe 템플릿을 그대로 쓰기보다, Wikibird용 `wiki-brief` 템플릿을 작게 만든다.
4. 나중에 반복 사용이 늘면 `typst.toml`이 있는 로컬/비공개 패키지 형태로 바꾼다.

## Open Limits

- 이번 작업은 조사와 HTML 정리만 했다. 실제 `.typ` 템플릿은 만들지 않았다.
- Typst HTML export 관련 문서는 확인했지만, 현재 Wikibird의 좌측 고정 목차형 웹 문서는 직접 HTML/CSS가 더 명확하다.
- 템플릿 생태계는 빠르게 변하므로 Universe 추천 템플릿 목록은 추후 실제 도입 시 다시 확인해야 한다.
