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
        <div className="absolute bottom-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7C8FA2]">
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
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.22em] text-[#52657c]">
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
          PLANMON STUDY LOOP FOR KOREAN STUDENTS · 공부 기록 · 캐릭터 성장 · 대시보드 · 결제
          플로우 · SUPABASE · TOSS PAYMENTS · PLANMON STUDY LOOP FOR KOREAN STUDENTS · 공부 기록
          · 캐릭터 성장 · 대시보드 · 결제 플로우 · SUPABASE · TOSS PAYMENTS
        </span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <article className="poster-card px-6 py-7 sm:px-8 sm:py-9">
          <div className="section-chip">Brand Launch Version</div>
          <h1 className="mt-6 max-w-4xl font-display text-[3.35rem] leading-[0.96] text-[#17273a] sm:text-[4.7rem] lg:text-[6rem]">
            공부가
            <br />
            계속되면,
            <br />
            브랜드가 된다
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#334a63] sm:text-lg">
            플랜몬은 단순한 공부 앱이 아니라 학교 친구에게 보여주고 싶은 공부 서비스로
            설계했습니다. 시험 일정, 체크리스트, 성장 캐릭터, 결제 흐름까지 하나의 톤으로
            묶어 기억에 남게 만듭니다.
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
              <div className="note-label mint">실제로 들어간 기능</div>
              <h2 className="mt-4 font-display text-4xl leading-none text-[#17273a]">
                보기만 하는
                <br />
                샘플이 아님
              </h2>
            </div>
            <div className="note-label gold">LIVE BUILD</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="metric-box bg-[#26c3a7] text-[#17273a]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0d5f53]">학습 저장</span>
              <strong>DB</strong>
              <p className="mt-2 text-sm font-semibold">Supabase 연동 준비</p>
            </div>
            <div className="metric-box bg-[#17273a] text-white">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">실제 결제</span>
              <strong>TOSS</strong>
              <p className="mt-2 text-sm font-semibold text-white/80">서버 승인 흐름 포함</p>
            </div>
            <div className="metric-box bg-[#ffb24b] text-[#17273a]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8a4b00]">배포 방식</span>
              <strong>WEB</strong>
              <p className="mt-2 text-sm font-semibold">Render Web Service</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "학습 대시보드에 Supabase 저장 흐름을 연결했습니다.",
              "Toss Payments 결제 생성과 승인 API를 나눠 구현했습니다.",
              "성공과 실패 화면, 주문 기록 구조까지 운영형으로 준비했습니다.",
              "정적 랜딩이 아니라 실제 서비스 확장이 가능한 구조로 바꿨습니다.",
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
              학생이 매일 켜고
              <br />
              싶어지는 화면
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#41556b]">
            무조건 기능만 많은 서비스가 아니라 한국 학생이 빠르게 이해하고 바로 쓰기 쉬운
            흐름으로 디자인했습니다. 눈에 띄지만 부담스럽지 않은 캐릭터 경험도 함께 넣었습니다.
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
              성장의 감정을 살린
              <br />
              캐릭터 체계
            </h2>
          </div>
          <div className="panel-outline max-w-xl px-5 py-4 text-sm leading-7 text-[#41556b]">
            무료 플랜은 부담 없이 시작하게, 유료 플랜은 캐릭터와 보상이 확실하게 느껴지도록
            디자인해 결제 이유가 눈에 보이게 만들었습니다.
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {characterCards.map((character, index) => (
            <article
              key={character.name}
              className={`poster-card character-glow p-6 ${index % 2 === 0 ? "floating" : "floating-delay"}`}
            >
              <div
                className="relative mx-auto mb-6 flex h-44 w-full max-w-[15rem] items-center justify-center rounded-[2rem]"
                style={{
                  background: `radial-gradient(circle at top, ${character.colors[1]}, transparent 60%), linear-gradient(180deg, ${character.colors[0]}, ${character.colors[1]})`,
                }}
              >
                <div className="absolute left-4 top-4 rounded-full bg-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
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
            결제 이유가
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-xs font-black uppercase tracking-[0.25em] ${
                      index === 1 ? "text-white/60" : "text-[#52657c]"
                    }`}
                  >
                    {plan.headline}
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-none">{plan.name}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    index === 1 ? "bg-white/15 text-white" : "bg-[#17273a] text-white"
                  }`}
                >
                  {plan.priceText}
                </span>
              </div>
              <p className={`mt-5 text-sm leading-7 ${index === 1 ? "text-white/80" : "text-[#41556b]"}`}>
                {plan.summary}
              </p>
              <ul className={`mt-6 space-y-3 text-sm ${index === 1 ? "text-white/85" : "text-[#41556b]"}`}>
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link
                className={`sticker-button mt-8 inline-flex px-6 py-3 text-sm font-bold ${
                  index === 1 ? "bg-[#ffb24b] text-[#17273a]" : "bg-[#17273a] text-white"
                }`}
                href={plan.code === "free" ? "/start" : `/checkout?plan=${plan.code}`}
              >
                {plan.code === "free" ? "무료로 시작" : `${plan.name} 선택`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="hard-card bg-[#fffdf8] p-6 sm:p-7">
          <div className="note-label navy">Launch Roadmap</div>
          <h2 className="mt-4 font-display text-4xl leading-none text-[#17273a]">
            배포 후 바로 이어갈
            <br />
            현실적인 단계
          </h2>
          <div className="mt-6 space-y-3">
            {roadmap.map((item) => (
              <div key={item} className="paper-item">
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#26c3a7]" />
                <p className="text-sm font-semibold leading-7 text-[#334a63]">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="poster-card p-6 sm:p-7">
          <div className="section-chip">For School Buzz</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-[#17273a]">
            친구가 써보고
            <br />
            퍼뜨리게 만들기
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "메인 화면에서 캐릭터와 오늘의 목표가 바로 보여야 합니다.",
              "회원가입 없이도 데모 대시보드를 체험할 수 있어야 합니다.",
              "결제 전에도 Pro 캐릭터와 플랜 차이가 확실히 보여야 합니다.",
              "한국어 문장이 자연스러워야 친구에게 링크를 보내기 편합니다.",
            ].map((tip) => (
              <div key={tip} className="panel-outline p-4 text-sm font-semibold leading-7 text-[#41556b]">
                {tip}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="sticker-button bg-[#ffb24b] px-6 py-4 text-sm font-bold text-[#17273a]" href="/start">
              대시보드 열기
            </Link>
            <Link className="ghost-button px-6 py-4 text-sm font-bold text-[#17273a]" href="/setup">
              연동 상태 확인
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
