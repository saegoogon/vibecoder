import Link from "next/link";
import { appEnv, hasSupabaseServerEnv, hasTossEnv } from "@/lib/env";

function StatusBadge({ ready }: { ready: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        ready ? "bg-[#e8fff6] text-[#027a48]" : "bg-[#fff3e8] text-[#b54708]"
      }`}
    >
      {ready ? "준비됨" : "누락됨"}
    </span>
  );
}

export default function SetupPage() {
  const supabaseReady = hasSupabaseServerEnv();
  const tossReady = hasTossEnv();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-6 sm:px-8 lg:px-10">
      <header className="mb-8">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
          Setup Checklist
        </p>
        <h1 className="mt-3 font-display text-5xl text-[#16324F]">운영 설정 확인</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#355070]">
          내가 대신 넣을 수 없는 외부 키와 서비스 연결 상태를 한눈에 볼 수 있게 정리했습니다.
          Render 환경변수와 Supabase, 토스 설정을 여기 기준으로 맞추면 됩니다.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="glass-card rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                Supabase
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#16324F]">데이터 저장</h2>
            </div>
            <StatusBadge ready={supabaseReady} />
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#355070]">
            <li>`NEXT_PUBLIC_SUPABASE_URL`: {appEnv.supabaseUrl ? "입력됨" : "비어 있음"}</li>
            <li>
              `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`:
              {" "}
              {appEnv.supabasePublishableKey ? "입력됨" : "비어 있음"}
            </li>
            <li>`SUPABASE_SERVICE_ROLE_KEY`: {appEnv.supabaseServiceRoleKey ? "입력됨" : "비어 있음"}</li>
          </ul>
          <p className="mt-5 rounded-[1.4rem] bg-white/70 px-4 py-4 text-sm leading-7 text-[#355070]">
            그리고 Supabase SQL Editor에서 `supabase/schema.sql`을 실행해야 학습 데이터와 주문 정보가 저장됩니다.
          </p>
        </article>

        <article className="glass-card rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                Toss Payments
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#16324F]">실제 결제</h2>
            </div>
            <StatusBadge ready={tossReady} />
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#355070]">
            <li>`TOSS_SECRET_KEY`: {appEnv.tossSecretKey ? "입력됨" : "비어 있음"}</li>
            <li>`NEXT_PUBLIC_SITE_URL`: {appEnv.siteUrl}</li>
          </ul>
          <p className="mt-5 rounded-[1.4rem] bg-white/70 px-4 py-4 text-sm leading-7 text-[#355070]">
            토스 키가 없으면 `/checkout` 화면은 열리지만 실제 결제창 생성은 막아두었습니다.
          </p>
        </article>
      </section>

      <section className="mt-8 glass-card rounded-[2rem] p-6">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
          Next Steps
        </p>
        <ol className="mt-4 space-y-3 text-sm leading-7 text-[#355070]">
          <li>1. Render 서비스를 `Web Service`로 두고 환경변수를 입력합니다.</li>
          <li>2. Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.</li>
          <li>3. `/api/health`를 열어 상태 JSON이 기대대로 보이는지 확인합니다.</li>
          <li>4. `/checkout`에서 결제 흐름을 다시 테스트합니다.</li>
        </ol>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            className="rounded-full bg-[#16324F] px-6 py-4 text-center text-sm font-semibold text-white hover:-translate-y-0.5"
            href="/api/health"
          >
            상태 JSON 보기
          </Link>
          <Link
            className="rounded-full border border-[#16324F]/10 bg-white/80 px-6 py-4 text-center text-sm font-semibold text-[#16324F] hover:-translate-y-0.5"
            href="/checkout"
          >
            결제 페이지 열기
          </Link>
        </div>
      </section>
    </main>
  );
}
