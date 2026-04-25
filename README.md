# CursorVerse

CursorVerse는 마우스 커서 스킨을 고르고 즉시 적용해 볼 수 있는 커서 갤러리 서비스입니다. 이번 버전은 프론트만 예쁘게 만든 샘플이 아니라, `Supabase DB`와 `Toss Payments 결제 승인 흐름`까지 고려한 실제 서비스 구조로 정리되어 있습니다.

## 주요 화면

- `/` 브랜드 랜딩 페이지
- `/start` 커서 작업실
- `/checkout` 프리미엄 커서 팩 결제 페이지
- `/setup` 환경변수와 외부 연동 상태 확인 페이지
- `/payments/success` 결제 승인 완료 페이지
- `/payments/fail` 결제 실패 페이지

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## 환경 변수

`.env.local` 파일을 만들고 아래 값을 넣어 주세요.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
TOSS_SECRET_KEY=...
```

예전 키 이름인 `NEXT_PUBLIC_SUPABASE_ANON_KEY`도 읽을 수 있지만, 현재 프로젝트는 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 기준으로 맞춰져 있습니다.

## Supabase 준비

`supabase/schema.sql`을 Supabase SQL Editor에서 실행해 주세요.

생성되는 테이블:

- `cursor_profiles`
- `cursor_orders`

## Toss Payments 준비

현재 구현은 Toss Payments 공식 흐름에 맞춰 아래 단계로 동작합니다.

- 서버에서 결제창 생성
- 성공 리다이렉트 후 서버에서 결제 승인

필요한 값:

- 테스트 또는 라이브 `TOSS_SECRET_KEY`

## Render 배포

이 프로젝트는 Render `Static Site`가 아니라 `Web Service`로 배포해야 합니다.

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

저장소 루트의 `render.yaml`도 같은 기준으로 맞춰져 있습니다.
