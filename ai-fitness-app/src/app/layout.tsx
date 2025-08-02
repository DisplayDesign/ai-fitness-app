import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIフィットネス - パーソナルトレーニングアプリ",
  description: "科学的根拠に基づいたAI搭載パーソナルトレーニングアプリ。あなたに最適なトレーニングプランを生成します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
