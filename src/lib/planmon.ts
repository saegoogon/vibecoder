export type PlanCode = "free" | "pro" | "pro_plus";

export type CursorProfile = {
  displayName: string;
  bio: string;
  selectedSkin: string;
  ownedSkins: string[];
  favoriteSkins: string[];
  clicks: number;
};

export type CursorSkin = {
  code: string;
  name: string;
  tier: "Free" | "Pro" | "Pro+";
  tagline: string;
  description: string;
  colors: [string, string];
  defaultCursor: string;
  pointerCursor: string;
};

function toCursorDataUrl(svg: string, x: number, y: number, fallback: string) {
  return `url("${`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}") ${x} ${y}, ${fallback}`;
}

function arrowSvg(fill: string, stroke: string, accent: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <path d="M8 4 L27 18 L19 19 L23 31 L16 33 L12 20 L6 27 Z" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="26" cy="8" r="4" fill="${accent}" />
    </svg>
  `;
}

function pointerSvg(fill: string, stroke: string, accent: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="11" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
      <path d="M20 9 V31 M9 20 H31" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;
}

const skinSpecs = [
  {
    code: "mint_arrow",
    name: "민트 애로우",
    tier: "Free" as const,
    tagline: "기본인데도 충분히 예쁜 시작점",
    description: "산뜻한 민트와 잉크 컬러로 가장 오래 써도 질리지 않는 기본 스킨입니다.",
    colors: ["#12d6b1", "#dffcf4"] as [string, string],
    fill: "#12d6b1",
    stroke: "#07131f",
    accent: "#ffe45e",
  },
  {
    code: "peach_pop",
    name: "피치 팝",
    tier: "Free" as const,
    tagline: "귀엽지만 유치하지 않은 톤",
    description: "복숭아빛 포인트와 둥근 타깃 커서가 어울리는 캐주얼 스킨입니다.",
    colors: ["#ff8b73", "#ffe3d7"] as [string, string],
    fill: "#ff8b73",
    stroke: "#1a1322",
    accent: "#ffd166",
  },
  {
    code: "glass_ice",
    name: "글래스 아이스",
    tier: "Pro" as const,
    tagline: "차갑고 매끈한 크롬 느낌",
    description: "투명한 유리 질감과 얼음빛 포인트를 섞은 미니멀 프리미엄 스킨입니다.",
    colors: ["#94d2ff", "#edf8ff"] as [string, string],
    fill: "#94d2ff",
    stroke: "#0c2338",
    accent: "#ffffff",
  },
  {
    code: "pixel_lime",
    name: "픽셀 라임",
    tier: "Pro" as const,
    tagline: "게임 화면에 잘 어울리는 픽셀 감성",
    description: "레트로 게임 UI를 닮은 색감으로 클릭하는 재미를 크게 살린 스킨입니다.",
    colors: ["#bbff43", "#f5ffdd"] as [string, string],
    fill: "#bbff43",
    stroke: "#111827",
    accent: "#ff5f5f",
  },
  {
    code: "gold_blade",
    name: "골드 블레이드",
    tier: "Pro+" as const,
    tagline: "빛을 베는 듯한 강한 존재감",
    description: "고급스러운 골드 톤과 선명한 윤곽선으로 존재감을 극대화한 스킨입니다.",
    colors: ["#ffbe3b", "#fff1cb"] as [string, string],
    fill: "#ffbe3b",
    stroke: "#221100",
    accent: "#ff5d8f",
  },
  {
    code: "void_black",
    name: "보이드 블랙",
    tier: "Pro+" as const,
    tagline: "선명하고 빠른 느낌의 다크 포인트",
    description: "검은 유광 질감 위에 민트 빛이 스치는, 가장 강렬한 시그니처 스킨입니다.",
    colors: ["#111827", "#d8fff7"] as [string, string],
    fill: "#111827",
    stroke: "#d8fff7",
    accent: "#00f5c4",
  },
];

export const cursorSkins: CursorSkin[] = skinSpecs.map((skin) => ({
  code: skin.code,
  name: skin.name,
  tier: skin.tier,
  tagline: skin.tagline,
  description: skin.description,
  colors: skin.colors,
  defaultCursor: toCursorDataUrl(arrowSvg(skin.fill, skin.stroke, skin.accent), 6, 3, "auto"),
  pointerCursor: toCursorDataUrl(pointerSvg(skin.fill, skin.stroke, skin.accent), 20, 20, "pointer"),
}));

export const cursorSkinMap = Object.fromEntries(
  cursorSkins.map((skin) => [skin.code, skin]),
) as Record<string, CursorSkin>;

export const highlights = [
  "고른 스킨이 즉시 사이트 전체 커서에 반영되는 실시간 프리뷰",
  "보유 스킨, 즐겨찾기, 선택한 커서를 Supabase에 저장하는 구조",
  "유료 팩 결제 이후 프리미엄 커서 잠금을 해제할 수 있는 서비스형 설계",
];

export const featureCards = [
  {
    title: "실시간 커서 적용",
    body: "스킨 카드를 누르는 즉시 사이트 전체의 마우스 모양이 바뀌어 구매 전에 바로 감을 잡을 수 있습니다.",
  },
  {
    title: "보관함 저장",
    body: "선택한 스킨, 즐겨찾기, 보유 중인 스킨을 기기와 클라우드에 함께 저장할 수 있도록 구조를 맞췄습니다.",
  },
  {
    title: "프리미엄 스킨 팩",
    body: "유료 팩마다 분위기가 확실히 다르게 보이도록 구성해 결제 이유가 시각적으로 분명하게 드러납니다.",
  },
  {
    title: "한국어 최적화",
    body: "국내 사용자가 바로 이해할 수 있는 문장과 결제 흐름으로 정리해 실제 서비스로 바로 쓰기 좋습니다.",
  },
];

export const plans = [
  {
    code: "free" as const,
    name: "Starter",
    headline: "바로 써보기",
    priceText: "무료",
    amount: 0,
    summary: "기본 커서 2종과 즉시 적용 기능을 체험하는 입문 팩",
    features: ["무료 커서 2종", "실시간 적용", "브라우저 저장", "기본 프로필"],
  },
  {
    code: "pro" as const,
    name: "Creator Pack",
    headline: "개성을 더 크게",
    priceText: "월 3,900원",
    amount: 3900,
    summary: "더 눈에 띄는 Pro 스킨과 저장 기능 확장을 포함한 핵심 팩",
    features: ["Pro 커서 2종 해금", "즐겨찾기 저장", "클라우드 저장", "광고 제거"],
  },
  {
    code: "pro_plus" as const,
    name: "Legend Pack",
    headline: "시그니처 스타일",
    priceText: "월 7,900원",
    amount: 7900,
    summary: "가장 강한 존재감의 Pro+ 스킨과 전체 컬렉션 기능을 여는 확장 팩",
    features: ["Pro+ 커서 2종 해금", "전체 보관함 관리", "한정 스킨 우선 제공", "결제 우선 지원"],
  },
];

export const planMap = Object.fromEntries(plans.map((plan) => [plan.code, plan])) as Record<
  PlanCode,
  (typeof plans)[number]
>;

export const defaultStudioData: CursorProfile = {
  displayName: "CursorKid",
  bio: "밋밋한 기본 커서 대신 내 취향이 바로 보이는 스킨을 모으는 중",
  selectedSkin: "mint_arrow",
  ownedSkins: ["mint_arrow", "peach_pop"],
  favoriteSkins: ["mint_arrow"],
  clicks: 1284,
};

export const roadmap = [
  "1주차: 랜딩과 커서 런타임을 완성하고 기본 스킨 2종을 무료로 공개",
  "2주차: Supabase에 프로필과 보유 스킨 정보를 저장하도록 연결",
  "3주차: Toss 결제로 Creator Pack과 Legend Pack을 해금하는 흐름 추가",
  "4주차: 신규 스킨 시즌 드롭과 공유 링크 기능 확장",
];

export function computeLevel(data: CursorProfile) {
  const ownedCount = data.ownedSkins.length;
  const favoriteCount = data.favoriteSkins.length;
  const xp = ownedCount * 120 + favoriteCount * 70 + Math.round(data.clicks / 9);

  return {
    xp,
    level: Math.max(1, Math.floor(xp / 180)),
    completedCount: ownedCount,
  };
}
