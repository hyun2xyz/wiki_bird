# Wikibird

![Wikibird mini wiki mascot](docs/assets/miniwiki.jpg)

> **안녕하세요. 무엇이든 다 정리해 드릴게요 짹**

Wikibird는 리서치를 해서 바로 읽을 수 있는 위키형 HTML 문서로 정리하는 에이전트/스킬입니다.

무언가를 조사해 달라고 하면, 최신 자료를 확인하고, 출처를 남기고, 목차가 있는 작은 위키 페이지로 만들어 줍니다. 
필요하면 Typst/PDF 출력도 같이 뽑습니다.

repo 최상단의 `index.html`은 로컬 작업용 목록입니다. `outputs/` 아래에 만들어진 리서치 HTML을 모아서 보여 줍니다. GitHub Pages 같은 공개 배포용 첫 화면은 `docs/index.html`의 사용 설명서를 씁니다.

## 무엇을 해주나

- 주제 리서치
- 출처 기반 정리
- 한국어 위키식 설명문 작성
- 고정 목차가 있는 HTML 페이지 생성
- Chrome 스크린샷 이미지 첨부
- `research.md`, `qa.md` 기록
- 선택적으로 Typst/PDF 출력

기본 결과물 구조는 이렇습니다.

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

각 출력 폴더의 `index.html`은 그냥 브라우저로 열어도 되는 정적 HTML입니다. 새 리서치 출력물은 바탕화면에 만들지 않고, 지정한 폴더 또는 repo 안의 `outputs/` 아래에 만듭니다.

## 화면 예시

repo 최상단의 `index.html`은 로컬에서만 쓰는 간단한 목록입니다.

![Wikibird local index screenshot](docs/assets/screenshots/local-index.png)

각 리서치 기록은 `outputs/YYYY-MM-DD-topic-slug/` 폴더 안에 있고, 그 안의 `index.html`을 로컬에서 열어 확인합니다. Wikibird 문서는 이렇게 왼쪽 목차, 본문, 이미지, 출처가 한 페이지에 정리됩니다.

![Wikibird wiki page screenshot](docs/assets/screenshots/wikibird-manual-page.png)

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

```text
위키버드로 써서 Typst 조사해줘
```

Wikibird가 발동된 대화에서는 답변 끝에 `짹`을 붙이는 작은 말투 규칙이 들어 있습니다.

```text
정리해 드릴게요 짹
완료했습니다 짹
```

리서치 깊이는 `하`, `중`, `상`으로 고를 수 있습니다. 안 쓰면 기본은 `중`입니다.

```text
$wikibird-research-html 써서 안드레 카파시를 조사해 주세요.
리서치 깊이: 상
인물 기본 정보, 얼굴/공식 프로필 화면, 대표 작업 화면도 같이 넣어 주세요.
```

기준은 대략 이렇습니다.

| 깊이 | 자료량 | 이미지 |
| --- | --- | --- |
| 하 | 빠른 개요, 3-5개 출처 | 1-2장 |
| 중 | 기본 Wikibird 문서, 6-10개 출처 | 3-5장 |
| 상 | 깊은 공부용 문서, 10개 이상 출처 가능하면 사용 | 5-8장 |

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

## 환경별 발동 방법

스킬을 “학습”시키는 방식은 도구마다 다릅니다. 핵심은 `skills/wikibird-research-html/SKILL.md`를 그 도구가 읽을 수 있는 위치에 두거나, 명령/프롬프트로 불러오게 하는 것입니다.

| 환경 | 넣는 방법 | 발동 방법 | 비고 |
| --- | --- | --- | --- |
| ChatGPT / GPT | ChatGPT Skills에서 `skills/wikibird-research-html` 폴더를 업로드하거나 새 Skill로 만듭니다. | 대화에서 `$wikibird-research-html` 또는 “Wikibird로 조사해줘”처럼 명시합니다. | ChatGPT Skills는 Agent Skills 형식을 따릅니다. |
| Codex | `scripts/install-skill.sh codex` 또는 `cp -R skills/wikibird-research-html ~/.codex/skills/` | Codex 세션에서 `Use $wikibird-research-html` 또는 “위키버드로 리서치해줘”라고 요청합니다. | 반복 사용하려면 프로젝트 `AGENTS.md`에 Wikibird 사용 규칙을 적어도 됩니다. |
| Claude | Claude Skills UI 또는 워크스페이스 Skills에 스킬 폴더를 업로드합니다. | Claude가 설명과 요청을 보고 자동으로 고르거나, 사용자가 “Wikibird skill을 써줘”라고 부릅니다. | 워크스페이스/플랜 설정에 따라 Skills 사용 가능 여부가 다릅니다. |
| Claude Code | `scripts/install-skill.sh claude` 또는 `cp -R skills/wikibird-research-html ~/.claude/skills/` | Claude Code에서 “Use wikibird-research-html” 또는 “Wikibird로 HTML 리서치 페이지 만들어줘”라고 요청합니다. | 프로젝트 전용으로는 `.claude/skills/wikibird-research-html/`에 둘 수 있습니다. |
| Gemini CLI | 스킬 폴더를 직접 읽는 환경이면 `~/.gemini/skills/`에 복사합니다. 안정적인 fallback은 custom command입니다. | `~/.gemini/commands/wikibird.toml`을 설치한 뒤 Gemini CLI에서 `/wikibird 주제`처럼 호출합니다. | Gemini CLI custom commands는 재사용 프롬프트를 명령으로 저장하는 방식입니다. |
| 일반 LLM / 기타 에이전트 | `SKILL.md` 내용을 system/custom instruction 또는 프로젝트 지침에 붙입니다. | “지금부터 Wikibird 모드로 답해줘”처럼 명시합니다. | 자동 발동이 없으면 매번 명시 호출이 필요합니다. |

참고한 공식 문서:

- OpenAI Help Center, [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)
- OpenAI Developers, [Codex use cases](https://developers.openai.com/codex/explore/)
- Anthropic Docs, [Agent Skills - Claude Code](https://docs.claude.com/en/docs/claude-code/skills)
- Anthropic Help Center, [Use Skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
- Gemini CLI Docs, [Custom Commands](https://google-gemini.github.io/gemini-cli/docs/cli/custom-commands.html)

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
- 인물 조사라면 공식 프로필/개인 사이트/강연/회사/학교 페이지처럼 얼굴이나 공개 활동을 확인할 수 있는 이미지를 우선합니다.
- 모든 키워드를 다 캡처하지는 않지만, 주제를 이해하는 데 필요한 주요 시각 자료는 깊이에 맞춰 넣습니다.
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

리서치한 기록은 각 출력 폴더 안의 `index.html`을 로컬에서 여는 방식으로 확인합니다.

전체 목록은 repo 최상단의 로컬 인덱스에서 봅니다.

```sh
node scripts/build-index.js
open index.html
```

새 리서치 결과를 만들거나 수정한 뒤에는 `node scripts/build-index.js`를 실행해 최상단 `index.html` 목록을 갱신합니다.

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
- `index.html` - 로컬 전용 리서치 결과 목록
- `docs/index.html` - GitHub 배포용 Wikibird 사용 설명서
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
