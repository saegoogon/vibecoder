import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planmon.onrender.com"),
  title: "Planmon | Study, Grow, Unlock",
  description:
    "Planmon is a study growth service where your character evolves as you complete tasks, log sessions, and keep your streak alive.",
  keywords: [
    "Planmon",
    "study planner",
    "study tracker",
    "student productivity",
    "character growth app",
  ],
  openGraph: {
    title: "Planmon | Study, Grow, Unlock",
    description:
      "A study growth service where your character evolves as you complete tasks and keep your streak alive.",
    images: ["/og-planmon.svg"],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planmon | Study, Grow, Unlock",
    description:
      "A branded student study service with character growth, premium plans, and a launch-ready landing page.",
    images: ["/og-planmon.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/planmon-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${plusJakartaSans.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
