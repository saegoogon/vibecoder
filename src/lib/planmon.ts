export type PlanCode = "free" | "pro" | "pro_plus";

export type Subject = {
  id: number;
  name: string;
  examDate: string;
  progress: number;
};

export type Task = {
  id: number;
  text: string;
  subject: string;
  done: boolean;
};

export type StudioData = {
  studentName: string;
  goal: string;
  subjects: Subject[];
  tasks: Task[];
};

export const highlights = [
  "한국 학생이 바로 이해하는 문장과 흐름으로 만든 공부 관리 서비스",
  "공부 기록이 남는 동시에 캐릭터와 리포트가 함께 성장하는 구조",
  "Supabase 저장과 Toss 결제까지 연결 가능한 실제 서비스형 설계",
];

export const featureCards = [
  {
    title: "오늘의 공부판",
    body: "시험 일정, 할 일, 진도율을 한 화면에 모아 지금 무엇부터 해야 하는지 바로 보이게 합니다.",
  },
  {
    title: "집중 기록",
    body: "공부 시간과 완료한 체크리스트가 캐릭터 경험치와 연결되어 꾸준함이 눈에 보이게 쌓입니다.",
  },
  {
    title: "주간 리포트",
    body: "이번 주에 잘한 과목과 밀린 구간을 짧고 선명한 문장으로 정리해 다음 계획을 쉽게 잡게 합니다.",
  },
  {
    title: "성장형 캐릭터",
    body: "출석, 할 일 완료, 진도 상승에 반응하는 캐릭터 시스템으로 지루한 공부 앱 느낌을 줄였습니다.",
  },
];

export const characterCards = [
  {
    name: "플래니",
    tier: "Free",
    description: "새싹처럼 시작해서 공부 루틴이 붙을수록 또렷하게 성장하는 기본 마스코트입니다.",
    colors: ["#2EC4B6", "#81E6D9"],
    face: "seed",
  },
  {
    name: "노바",
    tier: "Pro",
    description: "집중 시간이 쌓일수록 빛이 강해지는 우주 테마 캐릭터입니다.",
    colors: ["#1B4965", "#5FA8D3"],
    face: "nova",
  },
  {
    name: "토피",
    tier: "Pro",
    description: "연속 출석과 체크리스트 달성에 반응하는 민첩한 여우형 파트너입니다.",
    colors: ["#FF9F1C", "#FFD6A5"],
    face: "fox",
  },
  {
    name: "루미",
    tier: "Pro+",
    description: "야간 공부와 주간 리포트에 어울리는 빛의 요정 캐릭터입니다.",
    colors: ["#8E9AAF", "#CBC0D3"],
    face: "fairy",
  },
] as const;

export const plans = [
  {
    code: "free" as const,
    name: "Free",
    headline: "가볍게 시작",
    priceText: "무료",
    amount: 0,
    summary: "공부 기록과 캐릭터 감각을 먼저 체험하는 입문 플랜",
    features: ["시험 D-day", "오늘의 할 일", "기본 통계", "기본 캐릭터 플래니"],
  },
  {
    code: "pro" as const,
    name: "Pro",
    headline: "매일 쓰기 좋게",
    priceText: "월 3,900원",
    amount: 3900,
    summary: "프리미엄 캐릭터와 과목별 분석으로 습관을 붙이는 핵심 플랜",
    features: ["프리미엄 캐릭터 2종", "과목별 집중도 분석", "광고 제거", "희귀 스킨 해금"],
  },
  {
    code: "pro_plus" as const,
    name: "Pro+",
    headline: "진짜 관리형",
    priceText: "월 7,900원",
    amount: 7900,
    summary: "AI 루틴 추천과 리포트까지 포함한 확장형 플랜",
    features: ["AI 루틴 추천", "복습 플래너", "PDF 리포트", "시즌 한정 캐릭터 루미"],
  },
];

export const planMap = Object.fromEntries(plans.map((plan) => [plan.code, plan])) as Record<
  PlanCode,
  (typeof plans)[number]
>;

export const defaultStudioData: StudioData = {
  studentName: "민준",
  goal: "중간고사 전 과목 평균 92점 만들기",
  subjects: [
    { id: 1, name: "수학", examDate: "2026-05-11", progress: 72 },
    { id: 2, name: "과학", examDate: "2026-05-13", progress: 61 },
    { id: 3, name: "국어", examDate: "2026-05-09", progress: 80 },
  ],
  tasks: [
    { id: 1, text: "수학 서술형 4문제 다시 풀기", subject: "수학", done: true },
    { id: 2, text: "과학 반응식 암기 20분", subject: "과학", done: false },
    { id: 3, text: "국어 문법 오답노트 정리", subject: "국어", done: false },
  ],
};

export const roadmap = [
  "1주차: 브랜드 톤과 메인 화면, 한국어 카피 다듬기",
  "2주차: 학습 데이터 저장과 Supabase 테이블 연결",
  "3주차: Toss 결제 생성과 승인 플로우 연결",
  "4주차: 친구 테스트, 결제 로그 확인, 운영 준비",
];

export function computeLevel(data: StudioData) {
  const completedCount = data.tasks.filter((task) => task.done).length;
  const xp =
    180 +
    completedCount * 42 +
    Math.round(data.subjects.reduce((sum, subject) => sum + subject.progress, 0) / 8);

  return {
    xp,
    level: Math.floor(xp / 90),
    completedCount,
  };
}
