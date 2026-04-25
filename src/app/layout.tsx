import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import CursorRuntime from "@/components/cursor-runtime";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planmon.onrender.com"),
  title: "CursorVerse | 마우스 스킨을 고르고 바로 적용하는 커서 갤러리",
  description:
    "CursorVerse는 마우스 커서 스킨을 고르고 사이트 전체에 즉시 적용해 볼 수 있는 한국어 중심 커서 갤러리 서비스입니다.",
  keywords: ["커서버스", "마우스 커서 스킨", "커서 변경", "토스페이먼츠", "수파베이스"],
  openGraph: {
    title: "CursorVerse | 마우스 스킨을 고르고 바로 적용하는 커서 갤러리",
    description: "실시간 커서 적용, 보관함 저장, 결제 흐름까지 담은 커서 스킨 서비스",
    images: ["/og-planmon.svg"],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CursorVerse | 마우스 스킨을 고르고 바로 적용하는 커서 갤러리",
    description: "커서 스킨 선택, 저장, 결제까지 연결된 한국어 중심 서비스",
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
      className={`${notoSansKr.variable} ${blackHanSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CursorRuntime />
        {children}
      </body>
    </html>
  );
}
