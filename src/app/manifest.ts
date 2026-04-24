import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "플랜몬",
    short_name: "플랜몬",
    description: "공부할수록 캐릭터와 기록이 함께 성장하는 학습 서비스",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f2e8",
    theme_color: "#16324f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/planmon-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
