import Link from "next/link";
import { characterCards, featureCards, highlights, plans, roadmap } from "@/lib/planmon";

function CharacterAvatar({ face }: { face: string }) {
  const isFox = face === "fox";
  const isNova = face === "nova";
  const isFairy = face === "fairy";

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      {isFairy ? (
        <>
          <div className="pulse-soft absolute left-1/2 top-5 h-14 w-14 -translate-x-1/2 rounded-full bg-white/25 blur-md" />
          <div className="absolute left-1/2 top-1 h-8 w-20 -translate-x-1/2 rounded-full bg-white/35 blur-lg" />
        </>
      ) : null}
      <div
        className={`relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/70 bg-white/90 shadow-[0_14px_30px_rgba(0,0,0,0.12)] ${
          isFox ? "rounded-[42%]" : ""
        }`}
      >
        {isFox ? (
          <>
            <div className="absolute -top-2 left-3 h-8 w-8 rotate-[-20deg] rounded-[0.9rem] bg-[#FFE8C2]" />
            <div className="absolute -top-2 right-3 h-8 w-8 rotate-[20deg] rounded-[0.9rem] bg-[#FFE8C2]" />
          </>
        ) : null}
        {isNova ? (
          <div className="absolute -top-4 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 rounded-[1rem] bg-[#dff4ff] shadow-[0_0_24px_rgba(255,255,255,0.9)]" />
        ) : null}
        {face === "seed" ? (
          <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 gap-1">
            <span className="h-6 w-3 rotate-[-24deg] rounded-full bg-[#2EC4B6]" />
            <span className="h-6 w-3 rotate-[24deg] rounded-full bg-[#81E6D9]" />
          </div>
        ) : null}
        {isFairy ? (
          <>
            <div className="absolute left-[-10px] top-7 h-12 w-8 rounded-full bg-white/70 blur-[1px]" />
            <div className="absolute right-[-10px] top-7 h-12 w-8 rounded-full bg-white/70 blur-[1px]" />
          </>
        ) : null}
        <div className="flex gap-5">
          <span className="h-3.5 w-3.5 rounded-full bg-[#16324F]" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#16324F]" />
        </div>
        <div className="absolute bottom-7 h-3 w-8 rounded-full border-b-4 border-[#FF6B6B]" />
        <div className="absolute bottom-2 text-[10px] font-semibold tracking-[0.3em] text-[#7C8FA2] uppercase">
          PLANMON
        </div>
      </div>
    </div>
  );
}

export default function PlanmonHome() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-20 pt-6 sm:px-8 lg:px-10">
      <header className="glass-card sticky top-4 z-30 mb-8 rounded-full px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16324F] text-xl text-white shadow-lg">
              P
            </div>
            <div>
              <p className="font-display text-2xl leading-none text-[#16324F]">플랜몬</p>
              <p className="text-xs font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                Korean Study Growth Service
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold text-[#355070]">
            <a className="rounded-full px-4 py-2 hover:bg-white/70" href="#features">
              기능
            </a>
            <a className="rounded-full px-4 py-2 hover:bg-white/70" href="#characters">
              캐릭터
            </a>
            <a className="rounded-full px-4 py-2 hover:bg-white/70" href="#plans">
              요금제
            </a>
            <Link
              className="rounded-full bg-[#16324F] px-4 py-2 text-white hover:-translate-y-0.5"
              href="/start"
            >
              시작하기
            </Link>
          </nav>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center rounded-full border border-[#2EC4B6]/30 bg-white/70 px-4 py-2 text-sm font-semibold text-[#1B4965]">
            한국어에 맞춘 공부 관리, 성장 캐릭터, 실제 결제까지 준비된 학습 서비스
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl font-display text-5xl leading-[1.03] text-[#16324F] sm:text-6xl lg:text-7xl">
              공부를 기록하면
              <br />
              <span className="text-[#2EC4B6]">플랜몬이 자라고,</span>
              <br />
              습관이 남는다.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#355070] sm:text-xl">
              플랜몬은 한국 학생이 바로 이해할 수 있는 언어와 흐름으로 만든 공부 서비스예요.
              시험 일정, 오늘 할 일, 집중 시간, 캐릭터 성장, 요금제 업그레이드까지 한 서비스 안에서 이어집니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[#16324F] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_35px_rgba(22,50,79,0.2)] hover:-translate-y-1"
              href="/start"
            >
              무료로 체험하기
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[#16324F]/10 bg-white/80 px-7 py-4 text-base font-semibold text-[#16324F] hover:-translate-y-1"
              href="/checkout"
            >
              결제 페이지 보기
            </Link>
          </div>
          <ul className="grid gap-3 pt-2 text-sm text-[#355070] sm:grid-cols-3">
            {highlights.map((item) => (
              <li key={item} className="glass-card rounded-[1.5rem] px-4 py-4 leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-[2.5rem] p-6 sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                Launch Ready
              </p>
              <h2 className="mt-2 font-display text-3xl text-[#16324F]">서비스 핵심 상태</h2>
            </div>
            <span className="rounded-full bg-[#2EC4B6]/15 px-3 py-1 text-sm font-semibold text-[#1B4965]">
              한국어 최적화
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["학습 저장", "Supabase", "from-[#2EC4B6] to-[#7DE2D1]"],
              ["결제 연동", "Toss Payments", "from-[#16324F] to-[#4F86A6]"],
              ["배포 구조", "Render Web Service", "from-[#FFBF69] to-[#FFD9A0]"],
            ].map(([label, value, accent]) => (
              <div
                key={label}
                className={`rounded-[1.6rem] bg-gradient-to-br ${accent} p-4 text-white shadow-lg`}
              >
                <p className="text-xs tracking-[0.2em] uppercase text-white/80">{label}</p>
                <p className="mt-3 text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(27,73,101,0.09)]">
            <h3 className="font-display text-2xl text-[#16324F]">지금 들어간 실제 기능</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#355070]">
              <li>학습 데이터 로컬 저장과 수파베이스 동기화 준비</li>
              <li>토스페이먼츠 결제 생성과 서버 승인 API 흐름</li>
              <li>결제 성공/실패 화면과 주문 상태 저장 구조</li>
              <li>Render 정적 사이트가 아니라 서버 기능 가능한 웹 서비스 구조</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
              Core Features
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
              학생이 쓰기 쉬운 한국어 학습 UX
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#355070]">
            어렵게 보이는 생산성 앱이 아니라, 중학생도 바로 이해할 수 있는 흐름으로 다시 설계했습니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className={`glass-card rounded-[2rem] p-6 ${
                index === 1 || index === 3 ? "md:translate-y-6" : ""
              }`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16324F] text-sm font-bold text-white">
                0{index + 1}
              </div>
              <h3 className="font-display text-3xl text-[#16324F]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#355070]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="characters" className="mt-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
              Character Lineup
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
              결제 전환을 만드는 캐릭터 설계
            </h2>
          </div>
          <div className="max-w-xl rounded-[1.6rem] border border-[#1B4965]/10 bg-white/65 px-5 py-4 text-sm leading-7 text-[#355070]">
            무료 플랜은 친숙하게, 유료 플랜은 소장욕이 들게 구성해서 서비스의 기억점을 강하게 만들었습니다.
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {characterCards.map((character) => (
            <article key={character.name} className="glass-card character-glow rounded-[2rem] p-6">
              <div
                className="floating relative mx-auto mb-6 flex h-44 w-full max-w-[15rem] items-center justify-center rounded-[2rem]"
                style={{
                  background: `radial-gradient(circle at top, ${character.colors[1]}, transparent 60%), linear-gradient(180deg, ${character.colors[0]}, ${character.colors[1]})`,
                }}
              >
                <div className="absolute left-4 top-4 rounded-full bg-white/25 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-white uppercase">
                  {character.tier}
                </div>
                <CharacterAvatar face={character.face} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-3xl text-[#16324F]">{character.name}</h3>
                  <span className="rounded-full bg-[#16324F] px-3 py-1 text-xs font-semibold text-white">
                    {character.tier}
                  </span>
                </div>
                <p className="text-sm leading-7 text-[#355070]">{character.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="plans" className="mt-24">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
            결제 페이지로 바로 이어지는 플랜 구성
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.code}
              className={`rounded-[2rem] p-7 ${
                index === 1
                  ? "bg-[#16324F] text-white shadow-[0_25px_60px_rgba(22,50,79,0.24)]"
                  : "glass-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold tracking-[0.25em] uppercase ${
                      index === 1 ? "text-white/65" : "text-[#5C7C92]"
                    }`}
                  >
                    {plan.headline}
                  </p>
                  <h3 className="mt-2 font-display text-4xl">{plan.name}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    index === 1 ? "bg-white/15 text-white" : "bg-[#16324F] text-white"
                  }`}
                >
                  {plan.priceText}
                </span>
              </div>
              <p
                className={`mt-4 text-sm leading-7 ${
                  index === 1 ? "text-white/82" : "text-[#355070]"
                }`}
              >
                {plan.summary}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className={`rounded-[1.25rem] px-4 py-3 text-sm ${
                      index === 1 ? "bg-white/10 text-white" : "bg-white/75 text-[#16324F]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold ${
                  index === 1
                    ? "bg-[#FFBF69] text-[#16324F]"
                    : "bg-[#16324F] text-white hover:-translate-y-0.5"
                }`}
                href={plan.code === "free" ? "/start" : `/checkout?plan=${plan.code}`}
              >
                {plan.code === "free" ? "무료로 시작" : `${plan.name} 결제하기`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="glass-card rounded-[2.5rem] p-7">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
            Launch Flow
          </p>
          <h2 className="mt-3 font-display text-4xl text-[#16324F]">실전 배포 로드맵</h2>
          <div className="mt-6 space-y-4">
            {roadmap.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[1.6rem] border border-[#16324F]/8 bg-white/70 px-4 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16324F] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-[#355070]">{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2.5rem] bg-[#16324F] p-7 text-white shadow-[0_25px_60px_rgba(22,50,79,0.24)]">
          <p className="text-sm font-semibold tracking-[0.25em] text-white/65 uppercase">
            Service Upgrade
          </p>
          <h2 className="mt-3 font-display text-4xl">이제는 정적 페이지가 아니라 운영 가능한 앱</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
            이번 업데이트부터는 Render Static Site가 아니라 서버 기능을 사용할 수 있는 Render Web Service 구성을 기준으로 합니다.
            학습 데이터 저장과 결제 승인 API가 실제로 동작할 수 있는 구조예요.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "수파베이스 프로필 저장",
              "토스페이먼츠 주문 생성",
              "토스 결제 승인 API",
              "결제 성공/실패 화면",
              "서버 환경변수 기반 운영",
              "Render Web Service 배포",
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] bg-white/10 px-4 py-4 text-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[#FFBF69] px-6 py-4 text-sm font-semibold text-[#16324F] hover:-translate-y-0.5"
              href="/checkout"
            >
              결제 플로우 확인
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white hover:-translate-y-0.5"
              href="/start"
            >
              학습 대시보드 열기
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
