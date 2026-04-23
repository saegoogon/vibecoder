# Planmon

플랜몬은 한국 학생에게 맞춘 공부 관리 서비스입니다. 이번 버전부터는 디자인 개선뿐 아니라 `수파베이스 DB`와 `토스페이먼츠 실제 결제 승인 흐름`까지 붙일 수 있도록 서버 구조로 전환했습니다.

## 주요 화면

- `/` 브랜드 랜딩 페이지
- `/start` 학습 대시보드
- `/checkout` 토스 결제 시작 페이지
- `/payments/success` 결제 승인 완료 페이지
- `/payments/fail` 결제 실패 페이지

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어주세요.

## 환경 변수

`.env.local` 파일을 만들고 아래 값을 넣어주세요.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
TOSS_SECRET_KEY=...
```

`NEXT_PUBLIC_SUPABASE_ANON_KEY`만 쓰던 예전 설정도 일부 호환되지만, 현재는 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`를 권장합니다.

## Supabase 준비

`supabase/schema.sql`을 수파베이스 SQL Editor에서 실행하세요.

생성되는 테이블:

- `planmon_profiles`
- `planmon_orders`

## Toss Payments 준비

이 구현은 토스페이먼츠 공식 결제 흐름에 맞춰 아래 두 단계를 사용합니다.

- 서버에서 결제창 생성
- 성공 리다이렉트 후 서버에서 결제 승인

필요한 키:

- 테스트 또는 라이브 `TOSS_SECRET_KEY`

## Render 배포

이제 Render `Static Site`가 아니라 `Web Service`로 배포해야 합니다.

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

이미 저장소 루트의 `render.yaml`도 이 구성으로 맞춰져 있습니다.
