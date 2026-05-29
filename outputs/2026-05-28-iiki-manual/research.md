# Research

- 리서치 깊이: 하
- 주제: iiki 사용 설명서
- 목적: 공개 배포용 사용 설명서를 iiki 형식의 HTML로 정리
- 기준 파일:
  - `README.md`
  - `skills/iiki-research-html/SKILL.md`
  - `docs/research-html-workflow.md`
  - `docs/wiki-html-style-rules.md`
- 업데이트 내용:
  - 목차 중복 번호 제거
  - 설치/발동 안내를 GitHub URL, Skills 업로드, 프로젝트 지침, custom command 방식으로 정리
  - 첫 실행 시 리서치 깊이 기본값을 묻는 규칙 반영
  - IYO Wiki 복붙용 `iyo-wiki.txt` 출력 예시 추가
  - Typst/PDF 소책자 출력 예시 추가

## 이미지 커버리지

- 사용 이미지:
  - `assets/miniwiki.jpg`
  - `assets/screenshots/local-index.png`
  - `assets/screenshots/iiki-manual-page.png`
- 성격: README에 포함된 iiki mini wiki 이미지, 로컬 인덱스 화면, iiki 사용 설명서 화면
- 캡처일: 2026-05-28 KST
- viewport:
  - `local-index.png`: 1280x760
  - `iiki-manual-page.png`: 1280x900
- 외부 웹 캡처는 하지 않음. 이 문서는 외부 리서치가 아니라 repo 내부 사용 설명서이기 때문.

## 파생 출력

- IYO Wiki 복붙용 텍스트: `iyo-wiki.txt`
- Typst 소책자 원고: `typst/main.typ`
- Typst 소책자 템플릿: `typst/iiki-booklet.typ`
- PDF 출력: `typst/index.pdf`
