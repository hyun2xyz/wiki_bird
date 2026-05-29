# iiki

**2026-05-29 · v0.2.0 · 위키 txt와 Typst 소책자 베타 (ദ്ദി ᴖ⩊ᴖ )**

[English README](README.en.md)

![iiki mini wiki mascot](docs/assets/miniwiki.jpg)

> **짹**

```
안녕하세요, 현입니다.

저는 한국에서 편집디자인을 공부하며 AI를 활용한 다양한 파이프라인을 연구하고, 사람들과 공유하는 일을 하고 있어요. 
월드와이드웹의 공유 철학, HTML과 유머 그리고 글짓기를 사랑합니다.

***

5월 9일, Thariq Shihipar가 Claude Code 팀의 HTML 활용 방식을 X에서 게재했는데요.
AI에게 무언가 요청하고 산출물을 텍스트 또는 Markdown으로 받는 형식보다 HTML 프로토타입이 읽고 판단하기 쉬운 형식이라고 합니다.
우리가 평소에 인지하지는 못하지만, 텍스트 대신 그래픽 디자인으로 텍스트 없이 많은 양의 정보를 받아들이듯이요.
사용법은 단순하게 어떤 대화의 끝에 ‘이걸 HTML로 만들어줘’라고 하면 됩니다.

근데 이렇게 만들어진 HTML UI가 살짝 불편하구요. 더 중요한 건 아주 못생겼습니다.

***

제 친구 이키를 소개합니다.

저희 이요 위키에서 키우는 새인데요.
메인 서비스로는 말 끝마다 짹이라고 붙여서 귀엽습니다.

그리고 부가 서비스로 어떤 주제에 대해 리서치를 부탁하면 위키 스타일로 내용을 정리하고, 크롬 캡처를 활용해서 이미지 자료를 첨부해 주고요.
모든 내용은 MD와 HTML로 로컬에 저장되어서 index.html로 들어가면 그간의 기록을 한 번에 볼 수 있어요. 물론 이 파일로 호스팅도 가능하고요.

그럼 잘 사용하세요 짹.

```

Kim Hyun [@hyun2xyz](https://www.instagram.com/hyun2xyz)

iiki는 리서치를 해서 바로 읽을 수 있는 위키형 HTML 문서로 정리하는 에이전트/스킬입니다.

무언가를 조사해 달라고 하면, 최신 자료를 확인하고, 출처를 남기고, 목차가 있는 작은 위키 페이지로 만들어 줍니다. 
필요하면 Typst/PDF 출력도 같이 뽑습니다.

repo 최상단의 `index.html`은 로컬 작업용 목록입니다. `outputs/` 아래에 만들어진 리서치 HTML을 모아서 보여 줍니다. GitHub Pages 같은 공개 배포용 첫 화면은 `docs/index.html`의 사용 설명서를 씁니다.

## 무엇을 해주나

- 주제 리서치
- 출처 기반 정리
- 한국어 위키식 설명문 작성
- 고정 목차가 있는 HTML 페이지 생성
- Chrome 스크린샷 이미지 첨부
- IYO Wiki 복붙용 `iyo-wiki.txt` 생성
- `research.md`, `qa.md` 기록
- 선택적으로 Typst/PDF 소책자 출력

기본 결과물 구조는 이렇습니다.

```text
outputs/YYYY-MM-DD-topic-slug/
├── index.html
├── iyo-wiki.txt
├── research.md
├── qa.md
├── assets/
│   └── screenshots/
│       └── 01-source-or-page.png
└── typst/
    ├── iiki-booklet.typ
    ├── main.typ
    └── index.pdf
```

각 출력 폴더의 `index.html`은 그냥 브라우저로 열어도 되는 정적 HTML입니다. 새 리서치 출력물은 바탕화면에 만들지 않고, 지정한 폴더 또는 repo 안의 `outputs/` 아래에 만듭니다.

## 화면 예시

repo 최상단의 `index.html`은 로컬에서만 쓰는 간단한 목록입니다.

![iiki local index screenshot](docs/assets/screenshots/local-index.png)

각 리서치 기록은 `outputs/YYYY-MM-DD-topic-slug/` 폴더 안에 있고, 그 안의 `index.html`을 로컬에서 열어 확인합니다. iiki 문서는 이렇게 왼쪽 목차, 본문, 이미지, 출처가 한 페이지에 정리됩니다.

![iiki wiki page screenshot](docs/assets/screenshots/iiki-manual-page.png)

## 설치와 발동

iiki를 실제로 쓰는 권장 환경은 CLI 기반 에이전트입니다. 리서치 결과를 파일로 저장하고, Chrome 캡처를 남기고, `node scripts/build-index.js` 같은 검증까지 이어가려면 Codex CLI나 Claude Code가 가장 안정적입니다.

### 1. Codex CLI 설치

```sh
git clone https://github.com/hyun2xyz/iiki.git
cd iiki
scripts/install-skill.sh codex
```

현재 Codex user skill 위치는 `$HOME/.agents/skills/iiki-research-html/`입니다. repo 전용으로만 쓰려면 `.agents/skills/iiki-research-html/`에 둘 수 있습니다.

예전 Codex 환경을 쓰고 있다면 legacy 경로로 설치합니다.

```sh
scripts/install-skill.sh codex-legacy
```

Codex에서는 이렇게 부르면 됩니다.

```text
Use $iiki-research-html
```

### 2. Claude Code 설치

```sh
git clone https://github.com/hyun2xyz/iiki.git
cd iiki
scripts/install-skill.sh claude
```

Claude Code에서는 `~/.claude/skills/iiki-research-html/` 또는 프로젝트 `.claude/skills/iiki-research-html/`에 스킬 폴더를 둡니다.

Claude Code에서는 이렇게 부르면 됩니다.

```text
Use iiki-research-html
```

설치 스크립트는 기존 iiki 설치 폴더가 있으면 지우고 다시 복사합니다.

### 3. 기본 리서치 깊이 설정

처음 iiki를 학습시키거나 등록한 뒤에는 기본 리서치 깊이를 하나 정합니다.

```text
리서치 깊이를 기본값으로 정해둘까요? 하/중/상 중에서 고르면 됩니다.
하: 빠른 개요, 중: 일반 iiki 문서, 상: 공부용 깊은 조사입니다.
```

### 4. Windows에서 Codex CLI용 수동 설치

```powershell
git clone https://github.com/hyun2xyz/iiki.git
cd iiki

$dest = Join-Path $HOME ".agents\skills\iiki-research-html"
New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
Remove-Item -Recurse -Force $dest -ErrorAction SilentlyContinue
Copy-Item -Recurse ".\skills\iiki-research-html" $dest
```

### 5. 설치 확인

1. Codex나 Claude Code를 다시 시작합니다.
2. `$iiki-research-html` 또는 `Use $iiki-research-html`로 불러봅니다.
3. 처음 불렀다면 리서치 깊이를 `하`, `중`, `상` 중 하나로 정합니다.
4. 안 보이면 설치 폴더 안에 `SKILL.md`가 바로 있는지 확인합니다.

Codex 기준으로는 이런 구조여야 합니다.

```text
$HOME/.agents/skills/iiki-research-html/SKILL.md
```

### 6. 앱에서 1분 체험

ChatGPT, Claude, Gemini 앱에서는 설치와 발동법을 따로 설명하지 않습니다. 대신 아래 프롬프트를 한 번 붙여 넣고, 이번 대화에서 iiki 방식을 따라 하게 만들면 됩니다.

```text
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

이 방식은 구조를 맛보는 용도입니다. 앱 안에서는 실제 파일 생성, Chrome 캡처 저장, 로컬 인덱스 갱신이 안정적으로 이어지지 않을 수 있습니다. 제대로 된 iiki 결과물을 만들 때는 CLI 환경을 권장합니다.

### 문제 해결

- 앱에서 결과가 일반 답변처럼 나오면: GitHub 주소만 준 상태라 “이번 대화에서 따라 하기”로 동작한 것입니다. 위의 1분 체험 프롬프트처럼 `README.md`와 `SKILL.md`를 읽고, 결과물 목록을 명시합니다.
- HTML 모양이 iiki 스타일과 다르면: 앱이 실제 repo 파일을 열고 저장하지 못해 임의 스타일로 만든 경우가 많습니다. 실제 HTML 파일까지 필요하면 CLI 환경을 권장합니다.
- Codex에서 스킬이 안 보이면: `$HOME/.agents/skills/iiki-research-html/SKILL.md` 위치를 확인하고 Codex를 재시작합니다.
- 예전 Codex 설정을 쓰고 있다면: `scripts/install-skill.sh codex-legacy`로 `~/.codex/skills/`에 설치합니다.

참고한 공식 문서:

- OpenAI Developers, [Codex Skills](https://developers.openai.com/codex/skills)
- Anthropic Docs, [Agent Skills - Claude Code](https://code.claude.com/docs/en/skills)

## 빠른 사용법

스킬을 지원하는 에이전트에게 이렇게 말하면 됩니다.

```text
Use $iiki-research-html.
새로운 그래픽 디자인 교육과정 책을 조사해서 outputs/YYYY-MM-DD-graphic-design-course/index.html로 정리해 주세요.
최신 자료를 확인하고, Chrome 스크린샷도 넣고, research.md와 qa.md도 남겨 주세요.
```

한국어로 짧게 말해도 됩니다.

```text
$iiki-research-html 써서 Typst 템플릿 생태계를 조사하고 위키형 HTML로 만들어 주세요.
```

학습이 되었다면 더 짧게 해도 됩니다.

```text
이키로 써서 Typst 조사해줘
```

iiki가 발동된 대화에서는 답변 끝에 `짹`을 붙이는 작은 말투 규칙이 들어 있습니다.

```text
정리해 드릴게요 짹
완료했습니다 짹
```

리서치 깊이는 `하`, `중`, `상`으로 고를 수 있습니다. 안 쓰면 기본은 `중`입니다.

```text
$iiki-research-html 써서 안드레 카파시를 조사해 주세요.
리서치 깊이: 상
인물 기본 정보, 얼굴/공식 프로필 화면, 대표 작업 화면도 같이 넣어 주세요.
```

기준은 대략 이렇습니다.

| 깊이 | 자료량 | 이미지 |
| --- | --- | --- |
| 하 | 빠른 개요, 3-5개 출처 | 핵심 캡처 위주 |
| 중 | 기본 iiki 문서, 6-10개 출처 | 주요 섹션에 필요한 만큼 |
| 상 | 깊은 공부용 문서, 10개 이상 출처 가능하면 사용 | 이해와 검증에 필요한 만큼 충분히 추가 |

## Chrome 스크린샷

iiki는 리서치 HTML에 최소 1장의 Chrome 캡처 이미지를 넣는 것을 기본 규칙으로 합니다.

원칙은 이렇습니다.

- 공식 문서, 제품 페이지, 논문/자료 페이지, 최종 HTML 화면 중 하나를 캡처합니다.
- 인물 조사라면 공식 프로필/개인 사이트/강연/회사/학교 페이지처럼 얼굴이나 공개 활동을 확인할 수 있는 이미지를 우선합니다.
- 모든 키워드를 다 캡처하지는 않지만, 주제를 이해하는 데 필요한 주요 시각 자료는 필요에 따라 더 넣습니다. 이미지 개수에 고정 상한은 두지 않습니다.
- 이미지는 `assets/screenshots/` 아래에 저장합니다.
- HTML에는 `<figure class="screenshot">`로 넣습니다.
- `research.md`에는 URL, 캡처일, viewport, 사용 목적을 적습니다.
- 개인정보, 로그인 화면, 유료 원문, 비밀번호, 쿠키가 보이는 화면은 캡처하지 않습니다.

에이전트의 Chrome 도구가 없을 때는 helper를 쓸 수 있습니다.

```sh
skills/iiki-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

## 결과물 확인

HTML은 로컬에서 바로 열 수 있습니다.

```sh
open outputs/YYYY-MM-DD-topic-slug/index.html
```

리서치한 기록은 각 출력 폴더 안의 `index.html`을 로컬에서 여는 방식으로 확인합니다.

전체 목록은 repo 최상단의 로컬 인덱스에서 봅니다.

```sh
node scripts/build-index.js
open index.html
```

새 리서치 결과를 만들거나 수정한 뒤에는 `node scripts/build-index.js`를 실행해 최상단 `index.html` 목록을 갱신합니다.

## IYO Wiki 복붙용 txt

이요 위키에 붙여 넣을 텍스트가 필요하면 최종 HTML을 만든 뒤 아래 명령을 실행합니다.

```sh
node scripts/export-iyo-wiki-text.js outputs/YYYY-MM-DD-topic-slug
```

그러면 같은 폴더에 `iyo-wiki.txt`가 생깁니다. 제목, 문단, 링크, 목록, 표, 인용문, 이미지 캡션을 IYO Wiki에 붙여 넣기 쉬운 문법으로 바꿔 줍니다.

이미지는 `{{iyoimage ...}}` 형태의 자리표시자로 들어갑니다. 실제 위키에 올릴 때는 이미지를 업로드한 뒤 `file="..."` 경로를 맞춰 주면 됩니다.

## Typst/PDF 소책자

논문처럼 읽히는 소책자 PDF가 필요하면 아래 명령을 실행합니다.

```sh
node scripts/build-typst-booklet.js outputs/YYYY-MM-DD-topic-slug
```

그러면 `typst/main.typ`, `typst/iiki-booklet.typ`, `typst/index.pdf`가 만들어집니다. Typst CLI가 없으면 `.typ` 파일만 만들 수 있고, PDF 컴파일은 나중에 하면 됩니다.

Typst 원고만 만들고 싶을 때는 이렇게 씁니다.

```sh
node scripts/build-typst-booklet.js outputs/YYYY-MM-DD-topic-slug --no-compile
```

## repo 안 주요 파일

- `skills/iiki-research-html/SKILL.md` - 설치 가능한 스킬 본문
- `skills/iiki-research-html/references/` - 리서치/HTML/Typst 규칙
- `skills/iiki-research-html/scripts/capture-chrome-screenshot.sh` - Chrome 스크린샷 helper
- `scripts/export-iyo-wiki-text.js` - IYO Wiki 복붙용 txt 생성
- `scripts/build-typst-booklet.js` - Typst/PDF 소책자 생성
- `.claude/agents/iiki-research-html-builder.md` - Claude Code용 프로젝트 에이전트
- `index.html` - 로컬 전용 리서치 결과 목록
- `docs/index.html` - GitHub 배포용 iiki 사용 설명서
- `docs/research-html-workflow.md` - 작업 흐름 문서
- `docs/wiki-html-style-rules.md` - HTML 스타일 규칙
- `docs/distribution-plan.md` - Codex, Claude, Gemini, Cursor 배포 계획
- `outputs/` - 생성된 리서치 페이지 예시

## 글쓰기 톤

기본 톤은 한국어 위키식 설명입니다.

- 너무 AI스럽게 쓰지 않습니다.
- 짧은 문단으로 끊습니다.
- 출처가 있는 사실과 해석을 구분합니다.
- 최신 정보는 날짜를 명확히 씁니다.
- 흐름을 먼저 잡고, 표와 캡처 이미지를 곁들입니다.

## 라이선스

MIT. 스킬 폴더 안에도 별도 `LICENSE`가 들어 있어 폴더만 따로 배포할 수 있습니다.

## 그럼 화이팅
화이팅
