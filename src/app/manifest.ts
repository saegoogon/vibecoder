import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "포인터룸",
    short_name: "포인터룸",
    description: "마우스 커서 스킨을 고르고 바로 적용하는 커서 스튜디오",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d12",
    theme_color: "#0a0d12",
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
