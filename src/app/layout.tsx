import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
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
  title: "플랜몬 | 공부가 계속되게 만드는 성장형 학습 서비스",
  description:
    "플랜몬은 공부 기록, 캐릭터 성장, 실제 결제와 데이터 저장까지 연결된 한국어 중심 학습 서비스입니다.",
  keywords: ["플랜몬", "공부 관리", "학습 플래너", "토스페이먼츠", "수파베이스"],
  openGraph: {
    title: "플랜몬 | 공부가 계속되게 만드는 성장형 학습 서비스",
    description: "공부 기록과 캐릭터 성장, 결제 흐름까지 담은 한국 학생용 학습 서비스",
    images: ["/og-planmon.svg"],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "플랜몬 | 공부가 계속되게 만드는 성장형 학습 서비스",
    description: "랜딩, 대시보드, 결제, DB 준비까지 갖춘 공부 서비스",
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
