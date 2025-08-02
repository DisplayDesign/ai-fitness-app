'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Article, User } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { convertTimestamp } from '@/lib/utils';
import { ArrowLeft, BookOpen, Calendar, Tag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// モックユーザーデータ
const mockUser: User = {
  user_id: 'mock-user-id',
  email: 'user@example.com',
  profile: {
    name: 'ユーザー',
    gender: 'male',
    height: 170,
    weight: 70,
    training_history: 'beginner',
    goal: 'muscle_gain'
  },
  created_at: new Date(),
  updated_at: new Date()
};

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, selectedCategory]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      
      // サンプル記事データ（実際のアプリではFirestoreから取得）
      const sampleArticles: Article[] = [
        {
          article_id: '1',
          title: '筋力トレーニングの基礎知識',
          content: `
# 筋力トレーニングの基礎知識

## 1. 筋力トレーニングとは

筋力トレーニングは、筋肉に負荷をかけることで筋力を向上させる運動です。
適切に行うことで、以下の効果が期待できます：

- 筋力の向上
- 基礎代謝の向上
- 姿勢の改善
- 怪我の予防

## 2. 基本的な原則

### 過負荷の原則
筋肉は、普段より強い負荷をかけることで成長します。

### 漸進性の原則
負荷は徐々に増やしていくことが重要です。

### 継続性の原則
継続的に行うことで効果が現れます。

## 3. トレーニングの頻度

初心者の場合：
- 週2-3回
- 1回あたり30-60分
- 筋肉痛が治ってから次のトレーニング

## 4. 注意点

- 正しいフォームを保つ
- 無理をしない
- 十分な休息を取る
- 適切な栄養を摂る
          `,
          category: 'training',
          published_at: new Date('2024-01-15')
        },
        {
          article_id: '2',
          title: 'タンパク質の重要性',
          content: `
# タンパク質の重要性

## 1. タンパク質とは

タンパク質は、筋肉の構成要素となる重要な栄養素です。
筋力トレーニングを行う人は、特に意識して摂取する必要があります。

## 2. 1日の必要量

体重1kgあたり1.6-2.2gが推奨されています。
例：体重70kgの場合、112-154gのタンパク質が必要

## 3. 良質なタンパク質源

- 鶏肉（胸肉）
- 魚（マグロ、サーモン）
- 卵
- 乳製品（ギリシャヨーグルト）
- 豆類（豆腐、納豆）

## 4. 摂取のタイミング

- トレーニング前：2-3時間前
- トレーニング後：30分以内
- 就寝前：1-2時間前

## 5. 注意点

- 過剰摂取は腎臓に負担
- 水分を十分に摂る
- バランスの良い食事を心がける
          `,
          category: 'nutrition',
          published_at: new Date('2024-01-10')
        },
        {
          article_id: '3',
          title: '初心者向けトレーニングプログラム',
          content: `
# 初心者向けトレーニングプログラム

## 1. プログラムの概要

初心者の方に最適な、安全で効果的なトレーニングプログラムをご紹介します。

## 2. 週3回の分割法

### 月曜日：胸・三頭筋
- プッシュアップ：3セット × 10回
- ダンベルフライ：3セット × 12回
- ディップス：3セット × 8回

### 水曜日：背中・二頭筋
- プルアップ：3セット × 5回
- ダンベルロウ：3セット × 12回
- バーベルカール：3セット × 10回

### 金曜日：脚・肩
- スクワット：3セット × 15回
- レッグプレス：3セット × 12回
- ショルダープレス：3セット × 10回

## 3. 進歩の目安

- 1ヶ月目：フォームの習得
- 2ヶ月目：重量の増加
- 3ヶ月目：セット数の増加

## 4. 注意点

- 必ずウォームアップを行う
- 正しいフォームを優先する
- 無理をしない
- 十分な休息を取る
          `,
          category: 'training',
          published_at: new Date('2024-01-05')
        },
        {
          article_id: '4',
          title: '炭水化物とトレーニング',
          content: `
# 炭水化物とトレーニング

## 1. 炭水化物の役割

炭水化物は、トレーニング時の主要なエネルギー源です。
適切な摂取により、パフォーマンスが向上します。

## 2. 摂取のタイミング

### トレーニング前
- 2-3時間前：複雑炭水化物
- 30分前：簡単炭水化物

### トレーニング中
- 長時間のトレーニング時のみ
- スポーツドリンクなど

### トレーニング後
- 30分以内：簡単炭水化物
- 2時間以内：複雑炭水化物

## 3. 推奨摂取量

### トレーニング日
- 体重1kgあたり6-8g

### 休息日
- 体重1kgあたり3-5g

## 4. 良質な炭水化物源

- 玄米
- オートミール
- 全粒粉パン
- さつまいも
- バナナ

## 5. 注意点

- 精製された炭水化物は控えめに
- 食物繊維も一緒に摂る
- 個人の体質に合わせて調整
          `,
          category: 'nutrition',
          published_at: new Date('2023-12-28')
        },
        {
          article_id: '5',
          title: '怪我の予防とリハビリ',
          content: `
# 怪我の予防とリハビリ

## 1. 怪我の予防

### ウォームアップの重要性
- 筋肉の温度を上げる
- 関節の可動域を確保
- 心拍数を上げる

### 正しいフォーム
- 専門家に指導を受ける
- 鏡でフォームを確認
- 無理な重量を避ける

## 2. よくある怪我

### 腰痛
- 原因：デッドリフトのフォーム不良
- 予防：正しいフォームの習得
- 対処：安静、ストレッチ

### 肩の痛み
- 原因：オーバーヘッドプレスでの無理
- 予防：適切な重量選択
- 対処：アイシング、ストレッチ

### 膝の痛み
- 原因：スクワットでの膝の位置
- 予防：つま先の向きに注意
- 対処：休息、軽いストレッチ

## 3. リハビリの原則

- 痛みのない範囲で行う
- 段階的に負荷を上げる
- 専門家の指導を受ける
- 焦らずに時間をかける

## 4. 予防のためのストレッチ

### トレーニング前
- 動的ストレッチ
- 軽い有酸素運動

### トレーニング後
- 静的ストレッチ
- クールダウン
          `,
          category: 'training',
          published_at: new Date('2023-12-20')
        }
      ];

      setArticles(sampleArticles);
    } catch (error) {
      console.error('記事読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  };

  const getCategoryName = (category: string): string => {
    const categories: { [key: string]: string } = {
      training: 'トレーニング',
      nutrition: '栄養',
      all: 'すべて'
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      training: 'bg-blue-100 text-blue-800',
      nutrition: 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: any): string => {
    const convertedDate = convertTimestamp(date);
    return convertedDate.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
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
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
              <h1 className="text-xl font-bold text-gray-900">フィットネス記事</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* カテゴリフィルター */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>記事カテゴリ</CardTitle>
            <CardDescription>
              科学的根拠に基づいたトレーニングと栄養の知識
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['all', 'training', 'nutrition'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCategoryName(category)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 記事一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.article_id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedArticle(article)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {getCategoryName(article.category)}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.published_at)}
                      </div>
                    </div>
                  </div>
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.content.split('\n')[0].replace('#', '').trim()}
                </p>
                <div className="flex items-center mt-4 text-blue-600 text-sm font-medium">
                  続きを読む
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 結果が0件の場合 */}
        {filteredArticles.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">記事が見つかりません</h3>
              <p className="text-gray-500">
                カテゴリを変更して、もう一度お試しください。
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* 記事詳細モーダル */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{selectedArticle.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedArticle.category)}`}>
                        {getCategoryName(selectedArticle.category)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(selectedArticle.published_at)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedArticle(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedArticle.content}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full"
                >
                  閉じる
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 