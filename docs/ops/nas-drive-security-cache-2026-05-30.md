# NAS Drive 보안 및 이미지 캐시 업데이트 (2026-05-30)

작성일: 2026-05-30 KST

대상: `drive.iyoxyz.com`, FileBrowser, Cloudflare Tunnel, Cloudflare Access, Cloudflare Cache Rules
목적: NAS/FileBrowser의 공개 노출면을 줄이고, IYO Wiki 본문 이미지 반복 조회 부하를 Cloudflare 캐시로 흡수한다.

## 요약

`drive.iyoxyz.com`의 FileBrowser 접근 경로를 Cloudflare Access 뒤로 넣고, GitHub 로그인으로 1차 보호하도록 구성했다. 단, IYO Wiki 본문에서 사용하는 공개 이미지 다운로드 경로는 로그인 없이 열려야 하므로 별도 Bypass 예외를 만들었다.

또한 공개 이미지 다운로드 URL만 대상으로 Cloudflare Cache Rule을 추가해, 반복 이미지 조회가 NAS/FileBrowser까지 매번 내려가지 않도록 했다.

## 최종 접근 구조

```text
drive.iyoxyz.com/*
→ Cloudflare Access 필요
→ GitHub 로그인
→ FileBrowser 로그인

drive.iyoxyz.com/public/api/resources/download*
→ Cloudflare Access Bypass
→ Cloudflare Cache Rule 적용
```

## Cloudflare Access 설정

### 1. GitHub Identity Provider

Cloudflare Zero Trust에 GitHub Identity Provider를 연결했다.

- GitHub OAuth App 사용
- Cloudflare Access 테스트 성공
- 인증 테스트에서 GitHub 계정의 relay 이메일이 식별됨

민감 정보는 기록하지 않는다.

- OAuth Client Secret
- Cloudflare setup URL
- 개인 relay 이메일 전체
- 토큰

### 2. IYO Drive Admin

드라이브 전체 보호용 Access Application.

```text
Application name: IYO Drive Admin
Destination: drive.iyoxyz.com
Path: empty
Policy action: Allow
Identity provider: GitHub
Include: 지정된 GitHub 계정 이메일만 허용
```

목표:

- 외부에서 FileBrowser 로그인창이 바로 노출되지 않도록 한다.
- Cloudflare Access를 통과한 사용자만 FileBrowser 로그인 화면에 도달하게 한다.
- FileBrowser 자체 비밀번호는 2차 보호로 유지한다.

### 3. IYO Drive Public Images

IYO Wiki 본문 이미지용 공개 다운로드 예외.

```text
Application name: IYO Drive Public Images
Destination: drive.iyoxyz.com/public/api/resources/download*
Policy action: Bypass
Include: Everyone
```

목표:

- 위키 본문 이미지가 Cloudflare Access 로그인에 막히지 않게 한다.
- 공개 공유 hash 기반 다운로드 경로만 예외 처리한다.
- WebDAV, 로그인 필요 API, 개인 파일 경로는 예외 대상에 포함하지 않는다.

## Cloudflare Cache Rule

공개 이미지 다운로드 URL만 대상으로 Cache Rule을 추가했다.

```text
Rule name: Cache IYO Drive public images
```

조건:

```text
(http.host eq "drive.iyoxyz.com" and starts_with(http.request.uri.path, "/public/api/resources/download") and http.request.method in {"GET" "HEAD"})
```

설정:

```text
Cache eligibility: Eligible for cache
Edge TTL: Ignore cache-control header and use this TTL -> 7 days
Browser TTL: Override origin and use this TTL -> 7 days
Cache key: default
```

중요:

- query string은 캐시 키에 포함되어야 한다.
- `hash`, `file`, `inline` 값이 다른 이미지가 서로 섞이면 안 된다.
- `Ignore query string`은 사용하지 않는다.

## 검증 결과

실제 공개 이미지 다운로드 URL로 반복 요청했다.

첫 요청:

```text
cache-control: max-age=604800
cf-cache-status: MISS
```

두 번째 요청:

```text
age: 17
cache-control: max-age=604800
cf-cache-status: HIT
```

`604800`초는 7일이다. `cf-cache-status: HIT`가 확인되었으므로, 같은 이미지 반복 조회는 Cloudflare 캐시에서 처리된다.

## 운영상 이점

- FileBrowser 로그인창이 외부 봇에게 바로 노출되지 않는다.
- GitHub Access + FileBrowser 자체 로그인으로 이중 보호된다.
- IYO Wiki 본문 이미지는 공개 접근을 유지한다.
- 반복 이미지 조회가 NAS 디스크와 FileBrowser 프로세스를 덜 사용한다.
- Cloudflare에서 비정상적 요청을 한 번 걸러낼 수 있다.

## 주의할 점

- `drive.iyoxyz.com` 전체를 Bypass하면 안 된다.
- Bypass는 `/public/api/resources/download*` 경로에만 유지한다.
- Cache Rule은 GET/HEAD 공개 이미지 다운로드만 대상으로 한다.
- 대용량 파일 배포 CDN처럼 사용하지 않는다.
- 비밀번호, OAuth Secret, Tunnel token, setup URL은 GitHub Issue나 문서에 기록하지 않는다.
- Access 정책 변경 뒤에는 시크릿 창에서 다음 두 가지를 다시 검증한다.

```text
https://drive.iyoxyz.com
→ GitHub Access 로그인 요구

https://drive.iyoxyz.com/public/api/resources/download?...
→ 로그인 없이 이미지 응답
```

## 관련 운영 규칙

Windows Codex와 MacBook Codex가 IYO Wiki / NAS / Cloudflare 작업을 오갈 때는 GitHub Issue 기반 운영 로그를 사용한다.

추천 이슈:

```text
[OPS] NAS / Drive / Wiki 운영 로그
```

각 작업 종료 시 다음 항목을 댓글로 남긴다.

- 작업 시각
- 작업 위치
- 변경 또는 확인한 것
- 현재 상태
- 다음 작업자에게 남길 내용
- 관련 명령/URL
- 민감 정보 미기록 확인

## 결론

이번 업데이트로 `drive.iyoxyz.com`은 Cloudflare Access로 보호되고, IYO Wiki 공개 이미지 경로만 예외로 열린다. 공개 이미지 URL은 Cloudflare 캐시 HIT까지 확인되어, 보안과 반복 조회 성능을 동시에 개선한 상태다.
