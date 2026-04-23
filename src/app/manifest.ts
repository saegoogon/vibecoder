import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Planmon",
    short_name: "Planmon",
    description: "A study growth service where characters evolve as students learn.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6fbf6",
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
