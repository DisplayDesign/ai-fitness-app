'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dumbbell, Target, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">AIフィットネス</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                ダッシュボード
              </Button>
              <Button
                onClick={() => router.push('/dashboard')}
              >
                無料で始める
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI搭載パーソナル
            <span className="text-blue-600">トレーニング</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            科学的根拠に基づいたAIが、あなたに最適なトレーニングプランを生成。
            理想の体を効率的に手に入れましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push('/dashboard')}
              className="text-lg px-8 py-4"
            >
              無料で始める
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
            >
              詳細を見る
            </Button>
          </div>
        </div>

        {/* 機能紹介 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">パーソナライズ</h3>
            <p className="text-gray-600">
              あなたの目標とレベルに合わせた最適なトレーニングプラン
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">進捗管理</h3>
            <p className="text-gray-600">
              トレーニングログとAIフィードバックで継続をサポート
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AIサポート</h3>
            <p className="text-gray-600">
              24時間いつでも質問できるAIトレーナー
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">正しいフォーム</h3>
            <p className="text-gray-600">
              動画解説で安全で効果的なトレーニング
            </p>
          </div>
        </div>

        {/* 対象ユーザー */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">こんな方におすすめ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">初心者</h3>
                <p className="text-gray-600">
                  トレーニングを始めたいけど何から始めればいいかわからない方
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">中級者</h3>
                <p className="text-gray-600">
                  より効率的で効果的なトレーニングを求めている方
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">忙しい方</h3>
                <p className="text-gray-600">
                  時間を効率的に使って理想の体を手に入れたい方
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            今すぐ理想の体を手に入れよう
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            無料で始められるAI搭載パーソナルトレーニング
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/dashboard')}
            className="text-lg px-8 py-4"
          >
            無料で始める
          </Button>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Dumbbell className="h-8 w-8 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold">AIフィットネス</h3>
            </div>
            <p className="text-gray-400 mb-4">
              科学的根拠に基づいたAI搭載パーソナルトレーニングアプリ
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">利用規約</a>
              <a href="#" className="hover:text-white">プライバシーポリシー</a>
              <a href="#" className="hover:text-white">お問い合わせ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
