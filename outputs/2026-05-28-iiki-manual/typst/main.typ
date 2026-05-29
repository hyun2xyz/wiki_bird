#import "iiki-booklet.typ": iiki-booklet

#show: body => iiki-booklet(body, title: "iiki 사용 설명서", subtitle: "GitHub 배포용 안내 페이지. iiki 형식으로 정리한 사용법과 파일 구조.")

#figure(
  image("../assets/miniwiki.jpg", width: 100%),
)

= 1. 한 줄 결론

iiki는 조사한 내용을 출처, 이미지, 목차가 있는 작은 위키 HTML로 남기는 리서치 스킬이다.

핵심은 “리서치 메모”와 “읽을 수 있는 웹 문서”를 따로 만들지 않는 것이다. 조사하면서 출처를 남기고, Chrome 캡처를 넣고, 바로 열 수 있는 정적 HTML로 정리한다.

= 2. iiki가 뭔가

iiki는 특정 모델 전용 프롬프트가 아니라, 여러 에이전트가 읽고 따라 할 수 있는 스킬 폴더다. GitHub 주소를 주고 이번 대화에서 따라 하게 할 수도 있고, Skills나 프로젝트 지침에 등록해서 계속 부르게 할 수도 있다.

결과물은 기본적으로 outputs/YYYY-MM-DD-topic-slug/ 아래에 만들어진다. 폴더 안에는 index.html, research.md, qa.md, assets/screenshots/가 들어간다. 필요하면 이요 위키 복붙용 iyo-wiki.txt와 Typst 소책자 typst/index.pdf도 같이 만든다.

= 3. 설치와 등록

iiki를 실제로 쓰는 권장 환경은 CLI 기반 에이전트다. 리서치 결과를 파일로 저장하고, Chrome 캡처를 남기고, node scripts/build-index.js 같은 검증까지 이어가려면 Codex CLI나 Claude Code가 가장 안정적이다.

== Codex CLI

```
git clone https://github.com/hyun2xyz/iiki.git
cd iiki
scripts/install-skill.sh codex
```

현재 Codex user skill 위치는 \$HOME/.agents/skills/iiki-research-html/이다. repo 전용으로만 쓰려면 .agents/skills/iiki-research-html/에 둘 수 있다. 예전 Codex 환경은 scripts/install-skill.sh codex-legacy로 legacy 경로에 설치한다.

== Claude Code

```
git clone https://github.com/hyun2xyz/iiki.git
cd iiki
scripts/install-skill.sh claude
```

Claude Code에서는 ~/.claude/skills/iiki-research-html/ 또는 프로젝트 .claude/skills/iiki-research-html/에 스킬 폴더를 둔다. 설치 스크립트는 기존 iiki 설치 폴더가 있으면 지우고 다시 복사한다.

= 4. 발동과 말투

Codex CLI에서는 Use \$iiki-research-html, Claude Code에서는 Use iiki-research-html처럼 부른다. 처음 등록하거나 처음 부를 때는 기본 리서치 깊이를 먼저 정한다.

```
리서치 깊이를 기본값으로 정해둘까요? 하/중/상 중에서 고르면 됩니다.
하: 빠른 개요, 중: 일반 iiki 문서, 상: 공부용 깊은 조사입니다.
```

iiki 스킬이 활성화되면 일반 대화 답변 끝에 짹을 붙인다. 코드, 인용문, 출처 제목, 생성된 문서 본문 안에는 사용자가 따로 원하지 않는 한 넣지 않는다.

```
정리해 드릴게요 짹
완료했습니다 짹
```

== 앱에서 1분 체험

ChatGPT, Claude, Gemini 앱에서는 설치와 발동법을 따로 설명하지 않는다. 대신 아래 프롬프트를 한 번 붙여 넣고, 이번 대화에서 iiki 방식을 따라 하게 만들면 된다.

```
https://github.com/hyun2xyz/iiki 를 기준으로 iiki 방식을 사용해 주세요.
README.md와 skills/iiki-research-html/SKILL.md를 읽고 따라 해 주세요.

주제: HTML 프로토타입이 AI 리서치 결과물로 유용한 이유
리서치 깊이: 중
결과물:
- index.html 본문 구조
- research.md
- qa.md
- 캡처 이미지 후보
- 출처 목록

한국어 위키식 설명문으로 정리해 주세요.
```

이 방식은 구조를 맛보는 용도다. 앱 안에서는 실제 파일 생성, Chrome 캡처 저장, 로컬 인덱스 갱신이 안정적으로 이어지지 않을 수 있다. 제대로 된 iiki 결과물을 만들 때는 CLI 환경을 권장한다.

= 5. 사용법

요청은 짧게 해도 된다. 다만 출력 위치와 깊이를 같이 말하면 결과가 훨씬 안정적이다.

```
$iiki-research-html 써서 안드레 카파시를 조사해 주세요.
리서치 깊이: 상
출력 위치: outputs/2026-05-28-andrej-karpathy/
인물 기본 정보와 공개 프로필 이미지, 대표 작업 화면도 넣어 주세요.
```

스킬이 학습된 환경에서는 더 짧게 불러도 된다.

```
이키로 써서 Typst 조사해줘
```

출력 위치를 주지 않으면 repo 안의 outputs/ 아래에 날짜와 주제명으로 폴더를 만든다. 바탕화면을 기본 출력 위치로 쓰지 않는다.

= 6. 리서치 깊이

#table(
  columns: 4,
  inset: 5pt,
  stroke: 0.5pt + luma(75%),
  table.header([깊이], [출처], [이미지], [쓰임]),
  [하],
  [3-5개],
  [핵심 캡처 위주],
  [빠른 개요, 짧은 설명],
  [중],
  [6-10개],
  [주요 섹션에 필요한 만큼],
  [기본 iiki 문서],
  [상],
  [10개 이상 가능하면 사용],
  [이해와 검증에 필요한 만큼 충분히 추가],
  [공부용 정리, 인물/회사/기술사, 복잡한 비교],
)

iiki를 처음 등록하거나 처음 부를 때는 기본 리서치 깊이를 먼저 물어본다. 사용자가 깊이를 말하지 않고 바로 작업을 시키면 기본은 중으로 진행하고, 다음부터 바꿀 수 있다고 알려 준다.

= 7. 이미지 규칙

이미지는 장식이 아니라 확인용이다. 공식 문서, 제품 페이지, 논문 페이지, 강의 페이지, 최종 렌더 화면처럼 내용을 이해하는 데 도움이 되는 화면을 캡처한다. 이미지 개수에 고정 상한은 두지 않고, 필요하면 더 넣는다.

#figure(
  image("../assets/miniwiki.jpg", width: 100%),
  caption: [iiki README에 들어간 miniwiki 이미지. 공개 설명서의 식별 이미지로 사용한다.],
)

인물 조사라면 얼굴이나 공개 활동을 확인할 수 있는 공식 프로필, 학교/회사 페이지, 강연 페이지를 우선한다. 다만 개인 사진, 로그인 화면, 유료 원문, 쿠키나 개인정보가 보이는 화면은 캡처하지 않는다.

= 8. 위키 txt와 소책자

이요 위키에 붙여 넣을 텍스트가 필요하면 최종 HTML을 만든 뒤 iyo-wiki.txt를 뽑는다. 제목, 링크, 목록, 표, 인용문, 이미지 캡션을 위키 문법에 가깝게 바꿔 주는 보조 출력이다.

```
node scripts/export-iyo-wiki-text.js outputs/YYYY-MM-DD-topic-slug
```

논문처럼 읽히는 PDF 소책자가 필요하면 Typst 출력 도구를 쓴다. 기본은 A5 판형이고, typst/main.typ, typst/iiki-booklet.typ, typst/index.pdf를 만든다.

```
node scripts/build-typst-booklet.js outputs/YYYY-MM-DD-topic-slug
```

Typst 원고만 필요하면 --no-compile을 붙인다. PDF는 Typst CLI가 설치되어 있을 때 자동으로 컴파일된다.

= 9. 로컬 인덱스

repo 최상단의 index.html은 로컬 작업용 목록이다. outputs/ 아래에 만든 iiki 리서치 결과를 자동으로 모아 보여 준다.

```
node scripts/build-index.js
open index.html
```

새 리서치를 만들거나 기존 리서치를 수정한 뒤에는 위 명령을 실행한다. 그러면 루트 index.html에 목록이 갱신된다. 실제 리서치 기록은 각 출력 폴더 안의 index.html을 로컬에서 열어서 확인한다.

= 10. 화면 예시

로컬 인덱스는 아주 짧은 목록이다. 날짜와 제목만 보고 원하는 리서치 결과로 들어가는 출발점이라고 보면 된다.

#figure(
  image("../assets/screenshots/local-index.png", width: 100%),
  caption: [repo 최상단 index.html. 로컬에서 생성된 iiki 결과를 모아 보여 준다.],
)

개별 리서치 결과는 각 폴더의 index.html을 연다. 여기에는 고정 목차, 본문, 캡처 이미지, 출처가 같이 들어간다.

#figure(
  image("../assets/screenshots/iiki-manual-page.png", width: 100%),
  caption: [outputs/2026-05-28-iiki-manual/index.html 예시. iiki가 정리하는 위키 페이지 형태다.],
)

= 11. 배포 구조

GitHub에 공개되는 설명서는 이 파일, 즉 docs/index.html을 쓴다. 로컬 출력물 목록과 사용 설명서를 분리하면, 개인 작업 목록을 공개 페이지의 첫 화면으로 노출하지 않아도 된다.

GitHub Pages를 쓴다면 Pages source를 /docs로 지정하는 방식이 가장 단순하다.

= 12. 출처

- README.md (https://github.com/hyun2xyz/iiki/blob/main/README.md), iiki repo 사용 설명.
- SKILL.md (https://github.com/hyun2xyz/iiki/blob/main/skills/iiki-research-html/SKILL.md), iiki 스킬 본문.
- docs/research-html-workflow.md (https://github.com/hyun2xyz/iiki/blob/main/docs/research-html-workflow.md), 리서치 작업 흐름.
- docs/wiki-html-style-rules.md (https://github.com/hyun2xyz/iiki/blob/main/docs/wiki-html-style-rules.md), 위키 HTML 스타일 규칙.
- OpenAI Developers, Codex Skills (https://developers.openai.com/codex/skills).
- Anthropic Docs, Agent Skills in Claude Code (https://code.claude.com/docs/en/skills).

iiki manual. Static HTML, no build step.
