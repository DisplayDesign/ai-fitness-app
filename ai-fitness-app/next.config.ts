import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ハイドレーションエラーを無視（ブラウザ拡張機能による影響を除外）
  reactStrictMode: true,
  // 開発環境でのハイドレーション警告を抑制
  onDemandEntries: {
    // ページの保持時間を延長
    maxInactiveAge: 25 * 1000,
    // 同時に保持するページ数を増加
    pagesBufferLength: 2,
  },
};

export default nextConfig;
