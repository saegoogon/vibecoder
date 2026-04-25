import Link from "next/link";
import { appEnv, hasSupabaseServerEnv, hasTossEnv } from "@/lib/env";

function StatusBadge({ ready }: { ready: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        ready ? "bg-[#1f3320] text-[#c7ff80]" : "bg-[#2a1713] text-[#ffb1a3]"
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
    <main className="site-shell mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-6 sm:px-8 lg:px-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8e9eb3]">
          setup
        </p>
        <h1 className="mt-3 font-display text-5xl text-white">포인터룸 연결 상태</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9eadc1]">
          여기서는 지금 서비스에 부족한 외부 연결이 무엇인지 바로 확인할 수 있습니다. DB 저장과
          결제를 실제로 쓰려면 아래 항목이 채워져 있어야 합니다.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="poster-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8e9eb3]">supabase</p>
              <h2 className="mt-2 font-display text-3xl text-white">포인터 프로필 저장</h2>
            </div>
            <StatusBadge ready={supabaseReady} />
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#c6cfdb]">
            <li>`NEXT_PUBLIC_SUPABASE_URL`: {appEnv.supabaseUrl ? "입력됨" : "비어 있음"}</li>
            <li>
              `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`:{" "}
              {appEnv.supabasePublishableKey ? "입력됨" : "비어 있음"}
            </li>
            <li>`SUPABASE_SERVICE_ROLE_KEY`: {appEnv.supabaseServiceRoleKey ? "입력됨" : "비어 있음"}</li>
          </ul>
          <p className="mt-5 rounded-[1.4rem] bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[#9eadc1]">
            `supabase/schema.sql`을 실행해야 포인터 프로필과 주문 정보가 실제로 저장됩니다.
          </p>
        </article>

        <article className="poster-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8e9eb3]">toss payments</p>
              <h2 className="mt-2 font-display text-3xl text-white">프리미엄 팩 결제</h2>
            </div>
            <StatusBadge ready={tossReady} />
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#c6cfdb]">
            <li>`TOSS_SECRET_KEY`: {appEnv.tossSecretKey ? "입력됨" : "비어 있음"}</li>
            <li>`NEXT_PUBLIC_SITE_URL`: {appEnv.siteUrl}</li>
          </ul>
          <p className="mt-5 rounded-[1.4rem] bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[#9eadc1]">
            토스 키가 없으면 결제 페이지는 보이지만 실제 결제창은 열리지 않습니다.
          </p>
        </article>
      </section>

      <section className="mt-8 hard-card p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8e9eb3]">next steps</p>
        <ol className="mt-4 space-y-3 text-sm leading-7 text-[#c6cfdb]">
          <li>1. Render 환경변수에 Supabase와 Toss 값을 입력합니다.</li>
          <li>2. Supabase SQL Editor에서 `supabase/schema.sql`을 실행합니다.</li>
          <li>3. `/api/health`로 상태 JSON을 확인합니다.</li>
          <li>4. `/start`에서 포인터를 바꿔 보고 저장 상태를 다시 확인합니다.</li>
        </ol>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="sticker-button bg-[#a9ff2f] px-6 py-4 text-center text-sm font-semibold text-[#081018]" href="/api/health">
            상태 JSON 보기
          </Link>
          <Link className="ghost-button px-6 py-4 text-center text-sm font-semibold text-white" href="/start">
            작업실 열기
          </Link>
        </div>
      </section>
    </main>
  );
}
