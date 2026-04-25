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
    name: "스파크 민트",
    tier: "Free" as const,
    tagline: "처음 켜자마자 분위기가 달라지는 기본형",
    description: "검은 화면 위에서도 또렷하게 살아나는 민트 포인터입니다. 가장 오래 써도 질리지 않는 기준점 역할을 합니다.",
    colors: ["#18f2c2", "#d6fff7"] as [string, string],
    fill: "#18f2c2",
    stroke: "#081018",
    accent: "#f5ff7f",
  },
  {
    code: "peach_pop",
    name: "피치 펄스",
    tier: "Free" as const,
    tagline: "귀엽지만 싸구려처럼 보이지 않는 밝은 톤",
    description: "작업 화면에 포인트를 주고 싶을 때 쓰기 좋은 피치 계열 스킨입니다. 부드럽지만 존재감은 확실합니다.",
    colors: ["#ff8f75", "#ffe3da"] as [string, string],
    fill: "#ff8f75",
    stroke: "#170d12",
    accent: "#ffd54f",
  },
  {
    code: "glass_ice",
    name: "크롬 아이스",
    tier: "Pro" as const,
    tagline: "차갑고 정교한 스튜디오 장비 같은 느낌",
    description: "유리와 금속 사이의 질감을 노린 프리미엄 포인터입니다. 모던한 작업 화면과 특히 잘 어울립니다.",
    colors: ["#9fd4ff", "#eef8ff"] as [string, string],
    fill: "#9fd4ff",
    stroke: "#081726",
    accent: "#ffffff",
  },
  {
    code: "pixel_lime",
    name: "라임 픽셀",
    tier: "Pro" as const,
    tagline: "게임 UI처럼 톡 튀는 레트로 클릭감",
    description: "픽셀 감성의 라임 컬러와 선명한 대비를 살린 스킨입니다. 스트리밍 화면이나 데스크 셋업에 잘 붙습니다.",
    colors: ["#c2ff45", "#f6ffdb"] as [string, string],
    fill: "#c2ff45",
    stroke: "#111827",
    accent: "#ff5d5d",
  },
  {
    code: "gold_blade",
    name: "골드 블레이드",
    tier: "Pro+" as const,
    tagline: "한 번만 보여도 기억나는 시그니처 포인터",
    description: "샴페인 골드와 선명한 실루엣을 조합한 상위 스킨입니다. 프리미엄 팩의 존재감을 대표합니다.",
    colors: ["#ffbf3c", "#fff1c9"] as [string, string],
    fill: "#ffbf3c",
    stroke: "#1d1200",
    accent: "#ff5f94",
  },
  {
    code: "void_black",
    name: "보이드 블랙",
    tier: "Pro+" as const,
    tagline: "빠르고 무거운 느낌의 다크 시그니처",
    description: "검은 광택과 네온 민트 포인트를 섞은 가장 강한 스킨입니다. 포인터룸의 대표 무드에 가장 가깝습니다.",
    colors: ["#0d1218", "#d8fff7"] as [string, string],
    fill: "#0d1218",
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
  "카드를 누르는 순간 사이트 전체 커서가 즉시 바뀌는 실시간 프리뷰",
  "보유 스킨, 즐겨찾기, 현재 포인터를 저장할 수 있는 작업실 구조",
  "프리미엄 스킨 팩과 실제 결제 흐름까지 준비된 서비스형 설계",
];

export const featureCards = [
  {
    title: "즉시 적용",
    body: "선택한 스킨이 버튼이나 링크에만 잠깐 보이는 게 아니라, 사이트 전체 커서로 바로 바뀝니다.",
  },
  {
    title: "포인터 보관함",
    body: "지금 쓰는 커서와 즐겨찾기, 보유 중인 스킨을 한 화면에서 관리하도록 구성했습니다.",
  },
  {
    title: "프리미엄 팩",
    body: "무료 스킨과 유료 스킨의 분위기 차이가 명확하게 느껴지도록 시각적 레벨 차이를 크게 줬습니다.",
  },
  {
    title: "운영 준비",
    body: "Supabase 저장 구조와 Toss 결제 흐름까지 맞춰 두어 실제 배포형 서비스로 확장하기 쉽습니다.",
  },
];

export const plans = [
  {
    code: "free" as const,
    name: "Starter",
    headline: "가볍게 시작",
    priceText: "무료",
    amount: 0,
    summary: "무료 스킨 2종과 즉시 적용 기능을 먼저 체험하는 시작 팩",
    features: ["무료 커서 2종", "실시간 적용", "브라우저 저장", "기본 프로필"],
  },
  {
    code: "pro" as const,
    name: "Studio Pack",
    headline: "작업실 확장",
    priceText: "월 3,900원",
    amount: 3900,
    summary: "더 정교한 Pro 스킨과 저장 기능을 열어 주는 핵심 팩",
    features: ["Pro 커서 2종 해금", "즐겨찾기 저장", "클라우드 저장", "광고 제거"],
  },
  {
    code: "pro_plus" as const,
    name: "Signature Pack",
    headline: "대표 무드 해금",
    priceText: "월 7,900원",
    amount: 7900,
    summary: "가장 강한 시그니처 스킨과 상위 컬렉션 구성을 여는 확장 팩",
    features: ["Pro+ 커서 2종 해금", "전체 보관함 관리", "한정 스킨 우선 제공", "우선 지원"],
  },
];

export const planMap = Object.fromEntries(plans.map((plan) => [plan.code, plan])) as Record<
  PlanCode,
  (typeof plans)[number]
>;

export const defaultStudioData: CursorProfile = {
  displayName: "NightShift",
  bio: "지루한 기본 포인터 말고, 책상 분위기까지 바꿔주는 커서를 모으는 중",
  selectedSkin: "mint_arrow",
  ownedSkins: ["mint_arrow", "peach_pop"],
  favoriteSkins: ["mint_arrow"],
  clicks: 1284,
};

export const roadmap = [
  "1주차: 포인터룸 랜딩과 실시간 커서 엔진 정리",
  "2주차: 프로필 저장과 스킨 보유 상태를 Supabase에 연결",
  "3주차: Studio Pack, Signature Pack 결제 해금 흐름 연결",
  "4주차: 커서 공유 링크와 시즌 드롭 페이지 확장",
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
