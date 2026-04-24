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
    <main className="site-shell mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-24 pt-5 sm:px-7 lg:px-10">
      <header className="poster-card sticky top-4 z-30 mb-6 px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] border-2 border-[#17273a] bg-[#ffb24b] text-xl font-black text-[#17273a]">
              P
            </div>
            <div>
              <p className="font-display text-3xl leading-none text-[#17273a]">플랜몬</p>
              <p className="mt-1 text-xs font-extrabold tracking-[0.22em] text-[#52657c] uppercase">
                Korean Study Growth Service
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-[#31465d]">
            <a className="ghost-button px-4 py-2" href="#features">
              기능
            </a>
            <a className="ghost-button px-4 py-2" href="#characters">
              캐릭터
            </a>
            <a className="ghost-button px-4 py-2" href="#plans">
              요금제
            </a>
            <Link className="sticker-button bg-[#17273a] px-4 py-2 text-white" href="/start">
              시작하기
            </Link>
          </nav>
        </div>
      </header>

      <div className="marquee-line mb-8 rounded-full">
        <span>
          PLANMON • 공부 기록 • 캐릭터 성장 • 한국어 중심 UX • 토스 결제 • 수파베이스 저장 •
          PLANMON • 공부 기록 • 캐릭터 성장 • 한국어 중심 UX • 토스 결제 • 수파베이스 저장 •
        </span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <article className="poster-card px-6 py-7 sm:px-8 sm:py-9">
          <div className="section-chip">브랜드 런치 버전</div>
          <h1 className="mt-6 max-w-4xl font-display text-[3.35rem] leading-[0.96] text-[#17273a] sm:text-[4.7rem] lg:text-[6rem]">
            공부가
            <br />
            남는 화면,
            <br />
            기억되는 브랜드.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#334a63] sm:text-lg">
            플랜몬은 단순한 공부 앱이 아니라, 한국 학생이 바로 이해하고 친구에게 보여주고 싶어지는
            학습 서비스예요. 일정, 체크리스트, 성장 캐릭터, 결제 플로우까지 하나의 세계관으로 묶었습니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="sticker-button bg-[#26c3a7] px-7 py-4 text-sm font-extrabold text-[#17273a]"
              href="/start"
            >
              무료로 체험하기
            </Link>
            <Link className="ghost-button px-7 py-4 text-sm font-extrabold text-[#17273a]" href="/checkout">
              결제 화면 보기
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="panel-outline min-h-28 px-4 py-4 text-sm font-semibold leading-7 text-[#334a63]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="hard-card bg-[#fffdf8] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="note-label mint">지금 들어간 실제 기능</div>
              <h2 className="mt-4 font-display text-4xl leading-none text-[#17273a]">
                예쁜데
                <br />
                진짜 동작함
              </h2>
            </div>
            <div className="note-label gold">LIVE BUILD</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="metric-box bg-[#26c3a7] text-[#17273a]">
              <span className="text-xs font-black tracking-[0.2em] uppercase text-[#0d5f53]">학습 저장</span>
              <strong>DB</strong>
              <p className="mt-2 text-sm font-semibold">Supabase 구조 준비</p>
            </div>
            <div className="metric-box bg-[#17273a] text-white">
              <span className="text-xs font-black tracking-[0.2em] uppercase text-white/60">실제 결제</span>
              <strong>TOSS</strong>
              <p className="mt-2 text-sm font-semibold text-white/80">서버 승인 흐름 포함</p>
            </div>
            <div className="metric-box bg-[#ffb24b] text-[#17273a]">
              <span className="text-xs font-black tracking-[0.2em] uppercase text-[#8a4b00]">배포 방식</span>
              <strong>WEB</strong>
              <p className="mt-2 text-sm font-semibold">Render Web Service</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "학습 대시보드에 수파베이스 저장 흐름 연결",
              "토스페이먼츠 결제 생성과 결제 승인 API 구현",
              "실패와 성공 결과 화면, 주문 기록 구조 준비",
              "정적 랜딩이 아니라 실제 운영 가능한 서버 구조 전환",
            ].map((item, index) => (
              <div key={item} className="paper-item">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17273a] text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold leading-7 text-[#334a63]">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="features" className="mt-24">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-chip">Core Features</div>
            <h2 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
              한국어로 읽히는
              <br />
              공부 화면
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#41556b]">
            너무 스마트해 보이기만 하는 생산성 앱이 아니라, 실제 학생 말투와 사용 흐름에 가까운 인터페이스로 재구성했습니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className={`poster-card p-6 ${index === 1 || index === 3 ? "md:translate-y-6" : ""}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem] border-2 border-[#17273a] bg-[#ffb24b] text-sm font-black text-[#17273a]">
                0{index + 1}
              </div>
              <h3 className="font-display text-3xl leading-none text-[#17273a]">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#41556b]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="characters" className="mt-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-chip">Character Lineup</div>
            <h2 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
              소장욕이 생기는
              <br />
              캐릭터 설계
            </h2>
          </div>
          <div className="panel-outline max-w-xl px-5 py-4 text-sm leading-7 text-[#41556b]">
            무료 플랜은 친숙하게, 유료 플랜은 확실히 특별해 보이게 설계해서 전환 포인트를 시각적으로 만들었습니다.
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {characterCards.map((character) => (
            <article key={character.name} className="poster-card character-glow p-6">
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
                  <h3 className="font-display text-3xl leading-none text-[#17273a]">{character.name}</h3>
                  <span className="rounded-full bg-[#17273a] px-3 py-1 text-xs font-semibold text-white">
                    {character.tier}
                  </span>
                </div>
                <p className="text-sm leading-7 text-[#41556b]">{character.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="plans" className="mt-24">
        <div className="mb-8 text-center">
          <div className="section-chip">Pricing</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
            골라야 하는 이유가
            <br />
            보이는 요금제
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.code}
              className={`rounded-[2rem] p-7 ${
                index === 1 ? "hard-card bg-[#17273a] text-white shadow-none" : "poster-card"
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
                  <h3 className="mt-2 font-display text-4xl leading-none">{plan.name}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    index === 1 ? "bg-white/15 text-white" : "bg-[#17273a] text-white"
                  }`}
                >
                  {plan.priceText}
                </span>
              </div>
              <p
                className={`mt-4 text-sm leading-7 ${
                  index === 1 ? "text-white/82" : "text-[#41556b]"
                }`}
              >
                {plan.summary}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className={`rounded-[1.25rem] px-4 py-3 text-sm ${
                      index === 1 ? "bg-white/10 text-white" : "bg-white/75 text-[#17273a]"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                className={`mt-7 inline-flex w-full items-center justify-center px-5 py-4 text-sm font-semibold ${
                  index === 1
                    ? "sticker-button bg-[#ffb24b] text-[#17273a]"
                    : "sticker-button bg-[#17273a] text-white"
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
        <article className="poster-card p-7">
          <div className="section-chip">Launch Flow</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
            서비스로 가는
            <br />
            로드맵
          </h2>
          <div className="mt-6 space-y-4">
            {roadmap.map((step, index) => (
              <div key={step} className="paper-item">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17273a] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold leading-7 text-[#41556b]">{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="hard-card bg-[#17273a] p-7 text-white shadow-none">
          <div className="note-label gold">Service Upgrade</div>
          <h2 className="mt-4 font-display text-5xl leading-none">
            예뻐 보이기만
            <br />
            하는 사이트는 끝.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/82">
            이제 플랜몬은 템플릿 느낌의 랜딩이 아니라, 브랜드 감도와 실제 기능이 같이 움직이는 서비스 형태에 더 가깝습니다.
            배포, 저장, 결제까지 이어지는 구조를 이미 깔아둔 상태예요.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "수파베이스 프로필 저장",
              "토스페이먼츠 주문 생성",
              "토스 결제 승인 API",
              "결제 성공과 실패 화면",
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
              className="sticker-button inline-flex items-center justify-center bg-[#ffb24b] px-6 py-4 text-sm font-semibold text-[#17273a]"
              href="/checkout"
            >
              결제 플로우 확인
            </Link>
            <Link
              className="ghost-button inline-flex items-center justify-center border-white/15 px-6 py-4 text-sm font-semibold text-white"
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
