# Wikibird

![Wikibird mini wiki mascot](docs/assets/miniwiki.jpg)

Wikibird는 리서치를 해서 바로 읽을 수 있는 위키형 HTML 문서로 정리하는 에이전트/스킬입니다.

무언가를 조사해 달라고 하면, 최신 자료를 확인하고, 출처를 남기고, 목차가 있는 작은 위키 페이지로 만들어 줍니다. 
필요하면 Typst/PDF 출력도 같이 뽑습니다.

## 무엇을 해주나

- 주제 리서치
- 출처 기반 정리
- 한국어 위키식 설명문 작성
- 고정 목차가 있는 HTML 페이지 생성
- Chrome 스크린샷 이미지 첨부
- `research.md`, `qa.md` 기록
- 선택적으로 Typst/PDF 출력

구조

```text
outputs/YYYY-MM-DD-topic-slug/
├── index.html
├── research.md
├── qa.md
├── assets/
│   └── screenshots/
│       └── 01-source-or-page.png
└── typst/
    ├── main.typ
    ├── index.pdf
    └── index.html
```

`index.html`은 그냥 브라우저로 열어도 되는 정적 HTML입니다.

## 빠른 사용법

스킬을 지원하는 에이전트에게 이렇게 말하면 됩니다.

```text
Use $wikibird-research-html.
새로운 그래픽 디자인 교육과정 책을 조사해서 outputs/YYYY-MM-DD-graphic-design-course/index.html로 정리해 주세요.
최신 자료를 확인하고, Chrome 스크린샷도 넣고, research.md와 qa.md도 남겨 주세요.
```

한국어로 짧게 말해도 됩니다.

```text
$wikibird-research-html 써서 Typst 템플릿 생태계를 조사하고 위키형 HTML로 만들어 주세요.
```

학습이 되었다면 더 짧게 해도 됩니다.
```
위키버드로써서 Typst 조사해줘
```

## 설치

이 repo를 받은 뒤 루트에서 실행합니다.

```sh
scripts/install-skill.sh codex
scripts/install-skill.sh claude
scripts/install-skill.sh gemini
scripts/install-skill.sh cursor
```

전부 설치하려면:

```sh
scripts/install-skill.sh all
```

직접 복사해도 됩니다.

```sh
cp -R skills/wikibird-research-html ~/.codex/skills/
cp -R skills/wikibird-research-html ~/.claude/skills/
cp -R skills/wikibird-research-html ~/.gemini/skills/
```

ChatGPT나 Claude 웹/워크스페이스에서는 `skills/wikibird-research-html` 폴더만 zip으로 묶어서 Skills UI에 올리면 됩니다.

## Gemini CLI fallback

Gemini CLI에서 스킬 폴더를 바로 읽지 못하는 환경이면 custom command를 씁니다.

```sh
mkdir -p ~/.gemini/commands
cp adapters/gemini/commands/wikibird.toml ~/.gemini/commands/
```

그 다음 Gemini CLI에서 `wikibird` 명령에 조사할 주제를 넘겨 사용합니다.

## Chrome 스크린샷

Wikibird는 리서치 HTML에 최소 1장의 Chrome 캡처 이미지를 넣는 것을 기본 규칙으로 합니다.

원칙은 이렇습니다.

- 공식 문서, 제품 페이지, 논문/자료 페이지, 최종 HTML 화면 중 하나를 캡처합니다.
- 이미지는 `assets/screenshots/` 아래에 저장합니다.
- HTML에는 `<figure class="screenshot">`로 넣습니다.
- `research.md`에는 URL, 캡처일, viewport, 사용 목적을 적습니다.
- 개인정보, 로그인 화면, 유료 원문, 비밀번호, 쿠키가 보이는 화면은 캡처하지 않습니다.

에이전트의 Chrome 도구가 없을 때는 helper를 쓸 수 있습니다.

```sh
skills/wikibird-research-html/scripts/capture-chrome-screenshot.sh \
  "https://example.com" \
  outputs/YYYY-MM-DD-topic-slug/assets/screenshots/01-example.png
```

## 결과물 확인

HTML은 로컬에서 바로 열 수 있습니다.

```sh
open outputs/YYYY-MM-DD-topic-slug/index.html
```

Typst/PDF가 필요한 경우 repo 루트에서 컴파일합니다.

```sh
typst compile --root . outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.pdf
typst compile --root . --features html outputs/<slug>/typst/main.typ outputs/<slug>/typst/index.html
```

Typst HTML export는 아직 실험적이라, 문서용 결과는 PDF를 더 안정적인 출력으로 봅니다.

## repo 안 주요 파일

- `skills/wikibird-research-html/SKILL.md` - 설치 가능한 스킬 본문
- `skills/wikibird-research-html/references/` - 리서치/HTML/Typst 규칙
- `skills/wikibird-research-html/scripts/capture-chrome-screenshot.sh` - Chrome 스크린샷 helper
- `.claude/agents/research-html-builder.md` - Claude Code용 프로젝트 에이전트
- `docs/research-html-workflow.md` - 작업 흐름 문서
- `docs/wiki-html-style-rules.md` - HTML 스타일 규칙
- `docs/distribution-plan.md` - Codex, Claude, Gemini, Cursor 배포 계획
- `ex.html` - 기준 HTML 예시
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
