import Link from "next/link";
import PlanmonDemo from "@/components/planmon-demo";

const highlights = [
  "시험 일정, 할 일, 공부 시간 기록을 한 화면에서 관리",
  "공부할수록 캐릭터가 성장하는 보상형 루프",
  "학생도 부담 없는 Free, Pro, Pro+ 플랜 구성",
];

const stats = [
  { label: "오늘 집중 시간", value: "2h 40m", accent: "from-[#2EC4B6] to-[#81E6D9]" },
  { label: "연속 공부", value: "12일", accent: "from-[#FFBF69] to-[#FFD9A0]" },
  { label: "과목 진도", value: "78%", accent: "from-[#1B4965] to-[#4F86A6]" },
];

const features = [
  {
    title: "플랜보드",
    body: "시험 일정, 수행평가, 오늘 할 일을 카드처럼 정리해서 머릿속을 비워주는 홈 화면입니다.",
  },
  {
    title: "포커스 타이머",
    body: "집중 세션을 돌릴 때마다 경험치를 얻고, 과목별 공부 시간이 자동으로 쌓입니다.",
  },
  {
    title: "성장 리포트",
    body: "이번 주에 무엇을 잘했고 어디서 흔들렸는지 한눈에 보여주는 주간 분석 리포트입니다.",
  },
  {
    title: "플랜몬 진화",
    body: "연속 공부와 할 일 달성으로 외형, 배지, 테마가 바뀌는 캐릭터 성장 시스템입니다.",
  },
];

const plans = [
  {
    name: "Free",
    price: "0원",
    tag: "시작용",
    description: "학교 친구들에게 보여주기 좋은 기본형",
    items: ["시험 D-day", "할 일 체크", "기본 통계", "기본 캐릭터 플래니"],
  },
  {
    name: "Pro",
    price: "월 3,900원",
    tag: "인기",
    description: "캐릭터와 성장 시스템을 제대로 즐기는 플랜",
    items: ["프리미엄 캐릭터 2종", "과목별 집중도 분석", "광고 제거", "희귀 스킨 해금"],
  },
  {
    name: "Pro+",
    price: "월 7,900원",
    tag: "최상위",
    description: "AI 추천과 시즌 보상을 넣은 확장형",
    items: ["AI 공부 루틴 추천", "복습 플래너", "PDF 리포트", "한정 캐릭터 루미"],
  },
];

const characters = [
  {
    name: "플래니",
    tier: "Free",
    description: "새싹처럼 시작해서 꾸준함으로 자라는 기본 마스코트.",
    colors: ["#2EC4B6", "#81E6D9"],
    face: "seed",
  },
  {
    name: "노바",
    tier: "Pro",
    description: "집중 시간이 쌓일수록 오라가 강해지는 별빛 마법사.",
    colors: ["#1B4965", "#5FA8D3"],
    face: "nova",
  },
  {
    name: "토피",
    tier: "Pro",
    description: "연속 출석과 체크리스트 달성에 반응하는 민첩한 여우형 파트너.",
    colors: ["#FF9F1C", "#FFD6A5"],
    face: "fox",
  },
  {
    name: "루미",
    tier: "Pro+",
    description: "밤 공부와 주간 리포트에 맞춰 빛이 바뀌는 시즌 한정 요정.",
    colors: ["#8E9AAF", "#CBC0D3"],
    face: "fairy",
  },
];

const roadmap = [
  "1주차: 브랜딩, 랜딩 페이지, 캐릭터 콘셉트 완성",
  "2주차: 로그인, 과목 관리, 일정 입력 MVP 연결",
  "3주차: 공부 타이머, 경험치, streak 시스템 추가",
  "4주차: 결제 연동, 배포, 친구 테스트 시작",
];

const taskPreview = [
  { task: "과학 오답노트 정리", done: true },
  { task: "국어 문법 30문제 풀기", done: true },
  { task: "역사 개념 암기", done: true },
  { task: "수학 서술형 4문제", done: true },
  { task: "사회 수행평가 초안", done: false },
];

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

function CharacterCard({
  name,
  tier,
  description,
  colors,
  face,
}: (typeof characters)[number]) {
  return (
    <article className="glass-card character-glow rounded-[2rem] p-6">
      <div
        className="floating relative mx-auto mb-6 flex h-44 w-full max-w-[15rem] items-center justify-center rounded-[2rem]"
        style={{
          background: `radial-gradient(circle at top, ${colors[1]}, transparent 60%), linear-gradient(180deg, ${colors[0]}, ${colors[1]})`,
        }}
      >
        <div className="absolute left-4 top-4 rounded-full bg-white/25 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-white uppercase">
          {tier}
        </div>
        <CharacterAvatar face={face} />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-3xl text-[#16324F]">{name}</h3>
          <span className="rounded-full bg-[#16324F] px-3 py-1 text-xs font-semibold text-white">
            {tier}
          </span>
        </div>
        <p className="text-sm leading-7 text-[#355070]">{description}</p>
      </div>
    </article>
  );
}

export default function Home() {
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
                Study, Grow, Unlock
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

      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center rounded-full border border-[#2EC4B6]/30 bg-white/70 px-4 py-2 text-sm font-semibold text-[#1B4965]">
            공부할수록 캐릭터가 성장하는 학습 서비스
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-display text-5xl leading-[1.02] text-[#16324F] sm:text-6xl lg:text-7xl">
              공부가 쌓이면,
              <br />
              <span className="text-[#2EC4B6]">플랜몬도 자란다.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#355070] sm:text-xl">
              시험 일정, 할 일, 집중 시간 기록을 한 화면에 담고, 공부할수록 캐릭터와
              리포트가 성장하는 학생용 브랜드 서비스입니다. 친구들에게 보여주기 좋고,
              실제 유료 플랜까지 붙이기 쉬운 구조로 시작하세요.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[#16324F] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_35px_rgba(22,50,79,0.2)] hover:-translate-y-1"
              href="/start"
            >
              무료로 시작하기
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-full border border-[#16324F]/10 bg-white/80 px-7 py-4 text-base font-semibold text-[#16324F] hover:-translate-y-1"
              href="#characters"
            >
              캐릭터 보기
            </a>
          </div>
          <ul className="grid gap-3 pt-2 text-sm text-[#355070] sm:grid-cols-3">
            {highlights.map((item) => (
              <li key={item} className="glass-card rounded-[1.5rem] px-4 py-4 leading-6">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-6 sm:p-7">
          <div className="absolute inset-x-6 top-6 h-36 rounded-full bg-[#2EC4B6]/18 blur-3xl" />
          <div className="relative space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
                  Student Dashboard
                </p>
                <h2 className="font-display text-3xl text-[#16324F]">Planmon Home</h2>
              </div>
              <span className="rounded-full bg-[#2EC4B6]/15 px-3 py-1 text-sm font-semibold text-[#1B4965]">
                Live MVP
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-[1.6rem] bg-gradient-to-br ${stat.accent} p-4 text-white shadow-lg`}
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-white/80">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_rgba(27,73,101,0.09)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl text-[#16324F]">오늘의 할 일</h3>
                  <span className="rounded-full bg-[#F0F8F8] px-3 py-1 text-xs font-semibold text-[#2EC4B6]">
                    4 / 5 완료
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {taskPreview.map(({ task, done }) => (
                    <div
                      key={task}
                      className="flex items-center gap-3 rounded-[1.25rem] border border-[#16324F]/8 px-4 py-3"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          done ? "bg-[#2EC4B6] text-white" : "bg-[#F1F4F7] text-[#7C8FA2]"
                        }`}
                      >
                        {done ? "✓" : ""}
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          done ? "text-[#16324F]" : "text-[#7C8FA2]"
                        }`}
                      >
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#16324F] p-5 text-white shadow-[0_18px_40px_rgba(27,73,101,0.2)]">
                <p className="text-sm font-semibold tracking-[0.22em] text-white/70 uppercase">
                  Character Growth
                </p>
                <div className="floating-delay mt-4 flex justify-center">
                  <CharacterAvatar face="seed" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>플래니 Lv. 8</span>
                    <span>420 / 500 XP</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/15">
                    <div className="h-3 w-[84%] rounded-full bg-[#FFBF69]" />
                  </div>
                  <div className="rounded-[1.25rem] bg-white/10 p-4">
                    <p className="text-sm leading-6 text-white/85">
                      오늘 20분만 더 집중하면 플래니가 다음 진화 단계로 올라갑니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <PlanmonDemo />
      </section>

      <section id="features" className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
              Core System
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
              학교에서 자랑하기 좋은 기능 구성
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#355070]">
            단순한 체크리스트 앱이 아니라, 학생들이 친구에게 링크를 보내고 싶은 감성과
            반복 사용 이유를 같이 담았습니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
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
              Premium Characters
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
              유료 플랜 전환을 만드는 캐릭터 라인업
            </h2>
          </div>
          <div className="max-w-xl rounded-[1.6rem] border border-[#1B4965]/10 bg-white/65 px-5 py-4 text-sm leading-7 text-[#355070]">
            기본 캐릭터는 친숙하게, Pro 캐릭터는 소장욕이 들게, Pro+ 캐릭터는 희소성과
            상징성을 강하게 잡는 구조입니다.
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard key={character.name} {...character} />
          ))}
        </div>
      </section>

      <section id="plans" className="mt-24">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#5C7C92] uppercase">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-4xl text-[#16324F] sm:text-5xl">
            학생도 선택하기 쉬운 유료 플랜
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
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
                    {plan.tag}
                  </p>
                  <h3 className="mt-2 font-display text-4xl">{plan.name}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    index === 1 ? "bg-white/15 text-white" : "bg-[#16324F] text-white"
                  }`}
                >
                  {plan.price}
                </span>
              </div>
              <p
                className={`mt-4 text-sm leading-7 ${
                  index === 1 ? "text-white/82" : "text-[#355070]"
                }`}
              >
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.items.map((item) => (
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
                href="/start"
              >
                {index === 0 ? "무료로 시작" : `${plan.name} 선택`}
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
          <h2 className="mt-3 font-display text-4xl text-[#16324F]">배포까지 가는 4주 로드맵</h2>
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
            Deployment Stack
          </p>
          <h2 className="mt-3 font-display text-4xl">실전 배포 스택도 이미 맞춰둔 상태</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
            이 프로젝트는 Next.js 기반이라 Render Static Site로 바로 올릴 수 있고,
            다음 단계로는 Supabase 로그인과 결제 시스템을 자연스럽게 붙일 수 있습니다.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Next.js App Router",
              "Tailwind CSS v4",
              "Render 즉시 배포",
              "Supabase 연동 준비",
              "결제 플랜 확장 가능",
              "학교 친구 테스트용 시작 페이지 포함",
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] bg-white/10 px-4 py-4 text-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[#FFBF69] px-6 py-4 text-sm font-semibold text-[#16324F] hover:-translate-y-0.5"
              href="/start"
            >
              데모 바로 시작
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white hover:-translate-y-0.5"
              href="https://render.com/docs/deploy-nextjs-app"
              target="_blank"
              rel="noreferrer"
            >
              Render 배포 문서
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
