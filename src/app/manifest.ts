import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CursorVerse",
    short_name: "CursorVerse",
    description: "마우스 커서 스킨을 고르고 바로 적용하는 커서 갤러리 서비스",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7fb",
    theme_color: "#09111f",
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
