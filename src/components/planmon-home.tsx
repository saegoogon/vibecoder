import Link from "next/link";
import { cursorSkins, featureCards, highlights, plans, roadmap } from "@/lib/planmon";

function SkinPlate({
  name,
  tone,
  tier,
}: {
  name: string;
  tone: [string, string];
  tier: string;
}) {
  return (
    <article
      className="poster-card relative overflow-hidden p-5"
      style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0)), linear-gradient(135deg, ${tone[0]}22, ${tone[1]}10 48%, rgba(12,16,24,0.98) 100%)`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#9cadc2]">{tier}</p>
          <h3 className="mt-2 font-display text-3xl leading-none text-white">{name}</h3>
        </div>
        <div className="note-label navy">preview</div>
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div className="relative flex h-16 w-16 rotate-[-18deg] items-center justify-center rounded-[1.2rem] border border-white/15 bg-white/90 shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
          <div className="h-0 w-0 border-b-[34px] border-l-[14px] border-r-[14px] border-b-[#081018] border-l-transparent border-r-transparent" />
        </div>
        <div className="hero-number text-white/14">01</div>
      </div>
    </article>
  );
}

export default function PlanmonHome() {
  const heroSkins = cursorSkins.slice(0, 3);

  return (
    <main className="site-shell mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-24 pt-5 sm:px-7 lg:px-10">
      <header className="poster-card sticky top-4 z-30 mb-6 px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/12 bg-[#a9ff2f] text-xl font-black text-[#081018]">
              P
            </div>
            <div>
              <p className="font-display text-3xl leading-none text-white">포인터룸</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-[#90a0b4]">
                pointer skin studio
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold text-[#d7e0ec]">
            <a className="ghost-button px-4 py-2" href="#features">
              기능
            </a>
            <a className="ghost-button px-4 py-2" href="#skins">
              스킨
            </a>
            <a className="ghost-button px-4 py-2" href="#plans">
              팩
            </a>
            <Link className="sticker-button bg-[#a9ff2f] px-4 py-2 text-[#081018]" href="/start">
              작업실 열기
            </Link>
          </nav>
        </div>
      </header>

      <div className="marquee-line mb-8 rounded-full">
        <span>
          POINTER ROOM · LIVE CURSOR ENGINE · SKIN LIBRARY · CLICK TO APPLY · SAVE TO CLOUD ·
          PREMIUM PACKS · POINTER ROOM · LIVE CURSOR ENGINE · SKIN LIBRARY · CLICK TO APPLY ·
          SAVE TO CLOUD · PREMIUM PACKS
        </span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
        <article className="poster-card px-6 py-7 sm:px-8 sm:py-9">
          <div className="flex flex-wrap gap-2">
            <span className="cursor-chip">실시간 적용</span>
            <span className="cursor-chip">커서 보관함</span>
            <span className="cursor-chip">프리미엄 팩</span>
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[3.2rem] leading-[0.93] text-white sm:text-[4.8rem] lg:text-[6.8rem]">
            기본 마우스를
            <br />
            내 취향의 포인터로
            <br />
            갈아끼우는 방
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b7c3d4] sm:text-lg">
            포인터룸은 마우스 커서 스킨을 고르고 바로 적용해 보는 스튜디오입니다. 반짝이는
            버튼 몇 개만 붙인 페이지가 아니라, 실제 저장 구조와 결제 흐름까지 생각한 서비스형
            프로토타입으로 만들었습니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="sticker-button bg-[#a9ff2f] px-7 py-4 text-sm font-bold text-[#081018]"
              href="/start"
            >
              바로 커서 바꾸기
            </Link>
            <Link className="ghost-button px-7 py-4 text-sm font-bold text-white" href="/checkout">
              프리미엄 팩 보기
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="panel-outline px-4 py-4 text-sm font-semibold leading-7 text-[#c5d0de]">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="hard-card p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="note-label mint">studio status</div>
              <h2 className="mt-4 font-display text-4xl leading-none text-white">
                손대자마자
                <br />
                티가 나는 데모
              </h2>
            </div>
            <div className="note-label gold">live</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="metric-box bg-[#a9ff2f] text-[#081018]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2d4200]">apply</span>
              <strong>LIVE</strong>
              <p className="mt-2 text-sm font-semibold">선택 즉시 전체 반영</p>
            </div>
            <div className="metric-box bg-[#111723] text-white">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">save</span>
              <strong>DB</strong>
              <p className="mt-2 text-sm font-semibold text-white/82">프로필과 스킨 저장</p>
            </div>
            <div className="metric-box bg-[#73d7ff] text-[#081018]">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#003f54]">unlock</span>
              <strong>PACK</strong>
              <p className="mt-2 text-sm font-semibold">유료 스킨 해금 구조</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "스킨 카드 클릭만으로 사이트 전체 포인터가 바뀝니다.",
              "브라우저 저장과 클라우드 저장 흐름을 모두 갖췄습니다.",
              "Studio Pack과 Signature Pack 결제 API를 연결할 수 있게 열어 두었습니다.",
              "설정 페이지에서 DB와 결제 키 연결 상태를 바로 확인할 수 있습니다.",
            ].map((item, index) => (
              <div key={item} className="paper-item">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#081018]">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold leading-7 text-[#c7d0dd]">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {heroSkins.map((skin, index) => (
          <div key={skin.code} className={index === 1 ? "floating" : "floating-delay"}>
            <SkinPlate name={skin.name} tone={skin.colors} tier={skin.tier} />
          </div>
        ))}
      </section>

      <section id="features" className="mt-24">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-chip">core functions</div>
            <h2 className="mt-4 font-display text-5xl leading-none text-white">
              싸게 만든 느낌이 안 나게
              <br />
              디테일을 쌓는 방식
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#9eadc1]">
            템플릿 카드 몇 개를 나열하는 대신, 왜 눌러보고 싶은지와 왜 돈을 낼 수 있는지를
            화면 안에서 자연스럽게 읽히게 설계했습니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className={`poster-card p-6 ${index === 1 || index === 3 ? "md:translate-y-6" : ""}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/12 bg-white/6 text-sm font-black text-[#a9ff2f]">
                0{index + 1}
              </div>
              <h3 className="font-display text-3xl leading-none text-white">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#9eadc1]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skins" className="mt-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-chip">skin lineup</div>
            <h2 className="mt-4 font-display text-5xl leading-none text-white">
              포인터 하나로
              <br />
              데스크 무드가 바뀌는 순간
            </h2>
          </div>
          <div className="panel-outline max-w-xl px-5 py-4 text-sm leading-7 text-[#9eadc1]">
            무료는 가볍게 시작하고, 유료는 확실히 다른 인상을 주는 구조로 나눴습니다. 그래서
            결제 유도가 아니라 해금 욕구가 먼저 생기도록 잡았습니다.
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cursorSkins.map((skin, index) => (
            <article
              key={skin.code}
              className={`poster-card p-6 ${index % 2 === 0 ? "floating" : "floating-delay"}`}
            >
              <div
                className="relative flex h-44 items-end justify-between overflow-hidden rounded-[1.6rem] p-5"
                style={{
                  background: `linear-gradient(135deg, ${skin.colors[0]}22, ${skin.colors[1]}16 58%, rgba(8,13,18,0.95) 100%)`,
                }}
              >
                <div className="relative flex h-18 w-18 rotate-[-18deg] items-center justify-center rounded-[1.2rem] border border-white/15 bg-white/90 shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
                  <div className="h-0 w-0 border-b-[38px] border-l-[16px] border-r-[16px] border-b-[#081018] border-l-transparent border-r-transparent" />
                </div>
                <div className="note-label navy">{skin.tier}</div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl leading-none text-white">{skin.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#97a7bc]">{skin.tagline}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#9eadc1]">{skin.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="plans" className="mt-24">
        <div className="mb-8 text-center">
          <div className="section-chip">packs</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-white">
            무료는 입구처럼
            <br />
            유료는 시그니처처럼
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.code}
              className={`rounded-[2rem] p-7 ${
                index === 1 ? "hard-card text-white" : "poster-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#9cadc2]">
                    {plan.headline}
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-none text-white">{plan.name}</h3>
                </div>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-white">
                  {plan.priceText}
                </span>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#9eadc1]">{plan.summary}</p>
              <ul className="mt-6 space-y-3 text-sm text-[#d2dae5]">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <Link
                className={`sticker-button mt-8 inline-flex px-6 py-3 text-sm font-bold ${
                  plan.code === "free" ? "bg-white text-[#081018]" : "bg-[#a9ff2f] text-[#081018]"
                }`}
                href={plan.code === "free" ? "/start" : `/checkout?plan=${plan.code}`}
              >
                {plan.code === "free" ? "무료로 시작" : `${plan.name} 열기`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="hard-card p-6 sm:p-7">
          <div className="note-label mint">build notes</div>
          <h2 className="mt-4 font-display text-4xl leading-none text-white">
            포인터룸을
            <br />
            계속 키우는 순서
          </h2>
          <div className="mt-6 space-y-3">
            {roadmap.map((item) => (
              <div key={item} className="paper-item">
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#a9ff2f]" />
                <p className="text-sm font-semibold leading-7 text-[#c7d0dd]">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="poster-card p-6 sm:p-7">
          <div className="section-chip">why it works</div>
          <h2 className="mt-4 font-display text-5xl leading-none text-white">
            바로 눌러보게 만들면
            <br />
            설명이 짧아진다
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "사이트에 들어오자마자 커서가 진짜 바뀌니까 기능이 한 번에 이해됩니다.",
              "기본 스킨은 무료로 맛보고, 더 강한 인상은 팩으로 여는 구조가 자연스럽습니다.",
              "브랜드 이름과 화면 무드가 명확해서 기억에 남기 쉽습니다.",
              "커서라는 작은 요소를 진지하게 다루는 톤이 오히려 더 개발자답게 보입니다.",
            ].map((tip) => (
              <div key={tip} className="panel-outline p-4 text-sm font-semibold leading-7 text-[#c5d0de]">
                {tip}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="sticker-button bg-[#a9ff2f] px-6 py-4 text-sm font-bold text-[#081018]" href="/start">
              작업실 들어가기
            </Link>
            <Link className="ghost-button px-6 py-4 text-sm font-bold text-white" href="/setup">
              연결 상태 보기
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
