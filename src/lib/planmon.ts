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
  "중학생, 고등학생이 바로 이해하는 한국어 중심 학습 UX",
  "공부 기록이 쌓일수록 캐릭터와 성장 리포트가 살아나는 구조",
  "토스페이먼츠와 수파베이스를 붙여 실제 서비스로 확장 가능한 설계",
];

export const featureCards = [
  {
    title: "오늘의 플랜보드",
    body: "시험 일정, 수행평가, 오늘 할 일을 한 화면에서 정리해 머릿속을 비워주는 메인 허브입니다.",
  },
  {
    title: "집중 타이머",
    body: "공부 시간을 기록하면 경험치가 쌓이고, 과목별 진도와 루틴 데이터가 함께 남습니다.",
  },
  {
    title: "한국어 리포트",
    body: "이번 주 학습 패턴과 흔들린 구간을 부드러운 한국어 문장으로 요약해 보여줍니다.",
  },
  {
    title: "성장형 캐릭터",
    body: "출석, 할 일 완료, 집중 시간에 반응하는 플랜몬 성장 시스템으로 재방문을 유도합니다.",
  },
];

export const characterCards = [
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
    description: "집중 시간이 쌓일수록 별빛 오라가 강해지는 프리미엄 캐릭터.",
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
    description: "야간 공부, 주간 리포트, 시즌 배지와 연결되는 한정 요정.",
    colors: ["#8E9AAF", "#CBC0D3"],
    face: "fairy",
  },
] as const;

export const plans = [
  {
    code: "free" as const,
    name: "Free",
    headline: "시작용",
    priceText: "무료",
    amount: 0,
    summary: "기본 기록과 캐릭터 체험에 집중한 입문 플랜",
    features: ["시험 D-day", "할 일 체크", "기본 통계", "기본 캐릭터 플래니"],
  },
  {
    code: "pro" as const,
    name: "Pro",
    headline: "가장 인기",
    priceText: "월 3,900원",
    amount: 3900,
    summary: "캐릭터 성장과 상세 분석을 제대로 즐기는 플랜",
    features: ["프리미엄 캐릭터 2종", "과목별 집중도 분석", "광고 제거", "희귀 스킨 해금"],
  },
  {
    code: "pro_plus" as const,
    name: "Pro+",
    headline: "확장형",
    priceText: "월 7,900원",
    amount: 7900,
    summary: "AI 학습 루틴과 리포트까지 확장하는 상위 플랜",
    features: ["AI 루틴 추천", "복습 플래너", "PDF 리포트", "한정 캐릭터 루미"],
  },
];

export const planMap = Object.fromEntries(plans.map((plan) => [plan.code, plan])) as Record<
  PlanCode,
  (typeof plans)[number]
>;

export const defaultStudioData: StudioData = {
  studentName: "대성",
  goal: "중간고사 전 과목 평균 92점 만들기",
  subjects: [
    { id: 1, name: "수학", examDate: "2026-05-11", progress: 72 },
    { id: 2, name: "과학", examDate: "2026-05-13", progress: 61 },
    { id: 3, name: "국어", examDate: "2026-05-09", progress: 80 },
  ],
  tasks: [
    { id: 1, text: "수학 중간고사 서술형 4문제", subject: "수학", done: true },
    { id: 2, text: "과학 반응식 암기 20분", subject: "과학", done: false },
    { id: 3, text: "국어 문법 오답노트 정리", subject: "국어", done: false },
  ],
};

export const roadmap = [
  "1주차: 브랜딩 정리, 메인 화면, 한국어 문구 다듬기",
  "2주차: 학습 데이터 저장, 수파베이스 테이블 연결",
  "3주차: 토스페이먼츠 실제 결제 흐름과 승인 처리 연결",
  "4주차: 친구 테스트, 결제 로그 확인, 운영용 다듬기",
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
