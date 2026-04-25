import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, Space_Grotesk } from "next/font/google";
import CursorRuntime from "@/components/cursor-runtime";
import "./globals.css";

const plexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planmon.onrender.com"),
  title: "포인터룸 | 마우스 커서 스킨을 고르고 바로 적용하는 스튜디오",
  description:
    "포인터룸은 마우스 커서 스킨을 고르고, 바로 적용하고, 저장까지 이어가는 커서 스킨 스튜디오입니다.",
  keywords: ["포인터룸", "마우스 커서 스킨", "커서 변경", "토스페이먼츠", "수파베이스"],
  openGraph: {
    title: "포인터룸 | 마우스 커서 스킨을 고르고 바로 적용하는 스튜디오",
    description: "실시간 커서 적용, 작업실 저장, 프리미엄 팩 결제까지 이어지는 커서 스튜디오",
    images: ["/og-planmon.svg"],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "포인터룸 | 마우스 커서 스킨을 고르고 바로 적용하는 스튜디오",
    description: "커서 스킨 선택부터 저장과 결제까지 이어지는 커서 스튜디오",
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
      className={`${plexSansKr.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CursorRuntime />
        {children}
      </body>
    </html>
  );
}
