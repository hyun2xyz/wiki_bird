# GitHub가 뭘 하는 건지 리서치 노트

확인일: 2026-05-28  
출력 대상: `outputs/2026-05-28-github-what-it-does/index.html`

## 리서치 범위

질문은 "GitHub가 뭘 하는 건지"다. 단순히 "코드 저장소 사이트"로 끝내지 않고, GitHub가 실제 개발 흐름에서 맡는 역할을 설명하는 방향으로 잡았다.

정리 관점:

- Git과 GitHub의 차이
- 저장소, 브랜치, 커밋, Pull Request의 의미
- 이슈/프로젝트 관리
- Actions를 통한 자동화
- 보안 기능
- Copilot과 cloud agent까지 포함한 최근 방향

## 소스 맵

| Source | Type | Date / checked | 왜 봤나 | 핵심 주장 |
| --- | --- | --- | --- | --- |
| [About GitHub](https://github.com/about/) | 공식 회사/제품 소개 | checked 2026-05-28 | GitHub가 스스로를 어떻게 정의하는지 확인 | GitHub는 "secure software"를 만들고 전달하는 개발자 플랫폼이라고 소개한다. About 페이지 기준 180M+ developers, 4M+ organizations, 420M+ repositories, Fortune 100의 90% 사용 수치를 제시한다. |
| [About GitHub and Git](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git) | 공식 문서 | checked 2026-05-28 | 초심자용 정의 확인 | GitHub는 코드를 저장, 공유, 공동 작업하는 클라우드 기반 플랫폼이다. 저장소는 작업 공유, 변경 추적, 코드 리뷰, 협업을 가능하게 한다. |
| [GitHub Features](https://github.com/features) | 공식 제품 기능 목록 | checked 2026-05-28 | GitHub가 제공하는 기능 범위 확인 | Actions, Packages, APIs, Marketplace, security, Projects, Issues, repository insights, wiki, governance 등 개발 흐름 전반을 묶는다. |
| [Creating and managing repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories) | 공식 문서 | checked 2026-05-28 | repository의 실제 역할 확인 | GitHub repository는 프로젝트 파일을 저장하고 협업하는 공간이다. 파일 관리, 릴리스, 활동/데이터, 아카이브까지 포함한다. |
| [About issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues) | 공식 문서 | checked 2026-05-28 | 작업 추적 기능 확인 | Issues는 버그, 기능, 아이디어, 할 일을 계획/논의/추적하는 도구다. PR과 연결되고 Projects와 함께 계획에 쓰인다. |
| [GitHub Actions documentation](https://docs.github.com/en/actions) | 공식 문서 | checked 2026-05-28 | 자동화/CI/CD 역할 확인 | Actions는 repository 안에서 소프트웨어 개발 workflow를 자동화, 커스터마이즈, 실행한다. CI/CD, 테스트, 배포에 쓰인다. |
| [GitHub security features](https://docs.github.com/en/code-security/getting-started/github-security-features) | 공식 문서 | checked 2026-05-28 | 보안 기능 범위 확인 | dependency graph, SBOM, advisory database, Dependabot alerts, push protection 등 코드와 secret을 보호하는 기능을 제공한다. |
| [GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features) | 공식 문서 | checked 2026-05-28 | AI 기능의 현재 범위 확인 | Copilot Chat, inline suggestions, PR summaries, CLI, cloud agent, code review, agent mode, Spark, Spaces, MCP servers, agent skills 등을 제공한다. |
| [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) | 공식 문서 | checked 2026-05-28 | agentic workflow의 실제 설명 확인 | Copilot cloud agent는 repository를 조사하고 계획을 만들고 branch에서 코드를 고친 뒤 PR까지 열 수 있다. GitHub Actions 기반 임시 개발 환경을 쓴다. |

## Chrome 스크린샷

| 파일 | URL | Viewport | 캡처일 | 목적 |
| --- | --- | --- | --- | --- |
| `assets/screenshots/01-github-about.png` | https://github.com/about | 1440x1000 | 2026-05-28 | GitHub가 스스로를 "developer platform"으로 소개하는 첫 화면과 규모 수치 확인 |
| `assets/screenshots/02-github-docs-about.png` | https://docs.github.com/en/get-started/start-your-journey/about-github-and-git | 1440x1000 | 2026-05-28 | 초심자용 공식 정의와 Git/GitHub 차이 확인 |

## Claim ledger

| Claim | Confidence | Evidence | Notes |
| --- | --- | --- | --- |
| GitHub는 코드를 저장, 공유, 협업하는 클라우드 기반 플랫폼이다. | High | GitHub Docs: About GitHub and Git | 가장 기본 정의. |
| GitHub는 단순 저장소 사이트가 아니라 개발자 플랫폼으로 포지셔닝한다. | High | About GitHub, GitHub Features | About 페이지와 features 페이지의 제품 범위가 일치한다. |
| 저장소(repository)는 GitHub의 기본 단위다. | High | Repositories docs, About GitHub and Git | 파일 저장, 협업, 변경 추적의 중심. |
| Issues와 Projects는 작업 관리/계획 도구다. | High | About issues, GitHub Features | 이슈는 PR과 연결되고, Projects는 계획/추적 뷰로 확장된다. |
| Actions는 CI/CD와 자동화를 담당한다. | High | GitHub Actions docs, GitHub Features | 빌드, 테스트, 배포, 라벨링 등 자동화에 쓰인다. |
| GitHub는 보안 플랫폼 기능도 제공한다. | High | GitHub security features, GitHub Features | dependency graph, Dependabot, secret scanning, push protection 등. |
| Copilot 때문에 GitHub는 AI 개발 보조/에이전트 플랫폼 성격도 강해졌다. | High | Copilot features, Copilot cloud agent docs | Chat, inline suggestions, cloud agent, code review, agent skills, MCP 등을 공식 문서가 설명한다. |
| GitHub와 Git은 다르다. Git은 버전 관리 시스템이고 GitHub는 그 Git 기반 협업을 웹/클라우드에서 확장한 서비스다. | High | About GitHub and Git | 초심자에게 가장 중요한 구분. |

## 해석

GitHub를 설명할 때는 "개발자용 Google Drive" 정도의 비유가 출발점으로는 좋다. 하지만 거기서 멈추면 틀린 그림이 된다. Google Drive가 파일 보관과 공유에 가깝다면, GitHub는 "변경 이력", "리뷰", "자동화", "보안", "배포", "AI 지원"까지 개발 흐름 전체를 붙잡는다.

그래서 가장 적절한 요약은 이쪽이다.

> GitHub는 코드를 보관하는 곳이면서, 팀이 코드를 바꾸고 검토하고 자동으로 테스트/배포하고 안전하게 유지하는 작업장이다.

