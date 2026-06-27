import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '한율 · 지연의 결혼식에 초대합니다',
  description: '2026년 9월 5일 토요일, 메종디탈리에서 열리는 한율과 지연의 결혼식에 초대합니다.',
  openGraph: {
    title: '한율 · 지연의 결혼식에 초대합니다',
    description: '2026년 9월 5일 토요일, 메종디탈리.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
