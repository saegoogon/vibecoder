import Link from "next/link";
import { cursorSkins, featureCards, highlights, plans, roadmap } from "@/lib/planmon";

function SkinPreview({ tone }: { tone: [string, string] }) {
  return (
    <div
      className="relative flex h-40 items-center justify-center rounded-[1.8rem]"
      style={{
        background: `radial-gradient(circle at top, ${tone[1]}, transparent 56%), linear-gradient(180deg, ${tone[0]}, ${tone[1]})`,
      }}
    >
      <div className="absolute left-5 top-5 rounded-full bg-white/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
        live cursor
      </div>
      <div className="relative flex h-20 w-20 rotate-[-16deg] items-center justify-center rounded-[1.6rem] border-2 border-white/60 bg-white/85 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
        <div className="h-0 w-0 border-b-[42px] border-l-[18px] border-r-[18px] border-b-[#0a1320] border-l-transparent border-r-transparent" />
        <div className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-white/75" />
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
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] border-2 border-[#09111f] bg-[#12d6b1] text-xl font-black text-[#09111f]">
              C
            </div>
            <div>
              <p className="font-display text-3xl leading-none text-[#09111f]">CursorVerse</p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.22em] text-[#52657c]">
                mouse skin gallery
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-[#31465d]">
            <a className="ghost-button px-4 py-2" href="#features">
              기능
            </a>
            <a className="ghost-button px-4 py-2" href="#skins">
              스킨
            </a>
            <a className="ghost-button px-4 py-2" href="#plans">
              가격
            </a>
            <Link className="sticker-button bg-[#09111f] px-4 py-2 text-white" href="/start">
              커서 바꾸기
            </Link>
          </nav>
        </div>
      </header>

      <div className="marquee-line mb-8 rounded-full">
        <span>
          CURSORVERSE · LIVE CURSOR SKINS · CLICK TO APPLY · SAVE TO CLOUD · PREMIUM PACKS ·
          KOREAN UX · CURSORVERSE · LIVE CURSOR SKINS · CLICK TO APPLY · SAVE TO CLOUD ·
          PREMIUM PACKS · KOREAN UX
        </span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="poster-card px-6 py-7 sm:px-8 sm:py-9">
          <div className="section-chip">Cursor Skin Service</div>
          <h1 className="mt-6 max-w-4xl font-display text-[3.15rem] leading-[0.95] text-[#09111f] sm:text-[4.6rem] lg:text-[6rem]">
            밋밋한 마우스 대신
            <br />
            내 취향이 보이는
            <br />
            커서를 고르자
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#324760] sm:text-lg">
            CursorVerse는 마우스 커서 스킨을 고르고 바로 적용해 보는 서비스입니다. 스킨
            보관함, 즐겨찾기, 클라우드 저장, 유료 팩 결제까지 한 흐름으로 연결해 실제 서비스처럼
            동작하도록 만들었습니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="sticker-button bg-[#12d6b1] px-7 py-4 text-sm font-extrabold text-[#09111f]"
              href="/start"
            >
              실시간으로 바꿔보기
            </Link>
            <Link className="ghost-button px-7 py-4 text-sm font-extrabold text-[#09111f]" href="/checkout">
              프리미엄 팩 보기
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

        <article className="hard-card bg-[#fdfefe] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="note-label mint">이 서비스에서 되는 것</div>
              <h2 className="mt-4 font-display text-4xl leading-none text-[#09111f]">
                보기용 목업이 아니라
                <br />
                바로 만져보는 데모
              </h2>
            </div>
            <div className="note-label gold">LIVE DEMO</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="metric-box bg-[#12d6b1] text-[#09111f]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#006c58]">즉시 반영</span>
              <strong>LIVE</strong>
              <p className="mt-2 text-sm font-semibold">선택 즉시 커서 변경</p>
            </div>
            <div className="metric-box bg-[#09111f] text-white">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">클라우드 저장</span>
              <strong>DB</strong>
              <p className="mt-2 text-sm font-semibold text-white/82">Supabase 프로필 저장</p>
            </div>
            <div className="metric-box bg-[#ffbe3b] text-[#09111f]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#8a4b00]">프리미엄</span>
              <strong>PACK</strong>
              <p className="mt-2 text-sm font-semibold">Toss 결제 흐름 준비</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "선택한 스킨이 사이트 전체 커서에 바로 적용됩니다.",
              "보유 중인 스킨과 즐겨찾기를 저장할 수 있습니다.",
              "Pro, Pro+ 팩 결제용 주문 구조까지 이미 연결되어 있습니다.",
              "설정 상태 페이지에서 DB와 결제 키 연결 상태를 바로 확인할 수 있습니다.",
            ].map((item, index) => (
              <div key={item} className="paper-item">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#09111f] text-sm font-black text-white">
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
            <h2 className="mt-4 font-display text-5xl leading-none text-[#09111f]">
              커서 하나 바꾸는 경험도
              <br />
              서비스답게 만들기
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#41556b]">
            기능 설명보다 먼저 손에 닿는 느낌이 중요해서, 클릭하면 바로 반응하는 구조와 시각적인
            차이를 전면에 두었습니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className={`poster-card p-6 ${index === 1 || index === 3 ? "md:translate-y-6" : ""}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem] border-2 border-[#09111f] bg-[#94d2ff] text-sm font-black text-[#09111f]">
                0{index + 1}
              </div>
              <h3 className="font-display text-3xl leading-none text-[#09111f]">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#41556b]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skins" className="mt-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-chip">Skin Lineup</div>
            <h2 className="mt-4 font-display text-5xl leading-none text-[#09111f]">
              누르자마자 분위기가 달라지는
              <br />
              커서 스킨 컬렉션
            </h2>
          </div>
          <div className="panel-outline max-w-xl px-5 py-4 text-sm leading-7 text-[#41556b]">
            단순히 색만 바꾸는 수준이 아니라, 클릭 타깃과 존재감이 달라 보이도록 각 스킨의
            인상을 나눴습니다.
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cursorSkins.map((skin, index) => (
            <article
              key={skin.code}
              className={`poster-card p-6 ${index % 2 === 0 ? "floating" : "floating-delay"}`}
            >
              <SkinPreview tone={skin.colors} />
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#60748e]">
                    {skin.tier}
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-none text-[#09111f]">{skin.name}</h3>
                </div>
                <span className="note-label navy">{skin.tagline}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#41556b]">{skin.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="plans" className="mt-24">
        <div className="mb-8 text-center">
          <div className="section-chip">Pricing</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-[#09111f]">
            무료는 가볍게
            <br />
            유료는 확실하게
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.code}
              className={`rounded-[2rem] p-7 ${
                index === 1 ? "hard-card bg-[#09111f] text-white shadow-none" : "poster-card"
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
                    index === 1 ? "bg-white/15 text-white" : "bg-[#09111f] text-white"
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
                  index === 1 ? "bg-[#ffbe3b] text-[#09111f]" : "bg-[#09111f] text-white"
                }`}
                href={plan.code === "free" ? "/start" : `/checkout?plan=${plan.code}`}
              >
                {plan.code === "free" ? "무료로 시작" : `${plan.name} 열기`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="hard-card bg-[#fdfefe] p-6 sm:p-7">
          <div className="note-label navy">Launch Roadmap</div>
          <h2 className="mt-4 font-display text-4xl leading-none text-[#09111f]">
            지금 버전 이후에 붙이기 좋은
            <br />
            서비스 확장 순서
          </h2>
          <div className="mt-6 space-y-3">
            {roadmap.map((item) => (
              <div key={item} className="paper-item">
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#12d6b1]" />
                <p className="text-sm font-semibold leading-7 text-[#334a63]">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="poster-card p-6 sm:p-7">
          <div className="section-chip">Why It Spreads</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-[#09111f]">
            보여주기 좋은 기능은
            <br />
            퍼지기 쉽다
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "누르는 순간 커서가 바뀌니까 설명 없이도 바로 이해됩니다.",
              "친구가 링크를 열고 몇 번만 클릭해도 재미를 느낄 수 있습니다.",
              "유료 팩은 프리미엄 커서가 눈에 띄게 달라 보여 결제 이유가 분명합니다.",
              "설정과 저장 구조가 있어 한 번 꾸민 커서를 계속 쓰게 됩니다.",
            ].map((tip) => (
              <div key={tip} className="panel-outline p-4 text-sm font-semibold leading-7 text-[#41556b]">
                {tip}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="sticker-button bg-[#ff8b73] px-6 py-4 text-sm font-bold text-[#09111f]" href="/start">
              작업실 열기
            </Link>
            <Link className="ghost-button px-6 py-4 text-sm font-bold text-[#09111f]" href="/setup">
              DB/결제 상태 보기
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
