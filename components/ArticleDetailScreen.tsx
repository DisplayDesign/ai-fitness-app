import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, BookOpen, Share, Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen, Article } from '../App';

interface ArticleDetailScreenProps {
  article: Article | null;
  onNavigate: (screen: Screen) => void;
}

export function ArticleDetailScreen({ article, onNavigate }: ArticleDetailScreenProps) {
  if (!article) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('article-list')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <p className="mt-4 text-center text-muted-foreground">
            記事が見つかりません
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock extended content for the article
  const extendedContent = `
${article.content}

## 基本的な原則

フィットネスにおいて最も重要なのは継続性です。短期間で大きな変化を求めるのではなく、長期的な視点で取り組むことが成功の鍵となります。

### 1. 段階的な進歩

初心者の方は特に、急激な変化を求めがちですが、体は徐々に適応していくものです。週に1-2回から始めて、徐々に頻度を上げていくことをお勧めします。

### 2. 適切な休息

トレーニング後の回復期間は、実際のトレーニングと同じくらい重要です。筋肉の成長と修復のために、十分な睡眠と栄養を確保しましょう。

### 3. 栄養バランス

運動だけでなく、バランスの取れた食事も重要な要素です。特にタンパク質の摂取を意識し、野菜や果物も十分に取り入れましょう。

## 実践的なアドバイス

### 週間計画の立て方

効果的なトレーニングのためには、週間計画を立てることが重要です：

- 月曜日：上半身トレーニング
- 火曜日：有酸素運動
- 水曜日：休息日
- 木曜日：下半身トレーニング
- 金曜日：全身ストレッチ
- 土曜日：好きなスポーツ
- 日曜日：軽いウォーキング

### モチベーションの維持

長期的な成功のためには、モチベーションの維持が不可欠です：

1. 小さな目標を設定する
2. 進歩を記録する
3. 仲間と一緒に取り組む
4. 定期的に成果を確認する

## まとめ

フィットネスは一朝一夕では効果が現れませんが、継続することで必ず結果が出ます。焦らず、自分のペースで進めていくことが最も大切です。

何か質問があれば、いつでもAIトレーナーに相談してください。あなたの健康とフィットネスの目標達成をサポートします。
  `;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('article-list')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {article.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(article.publishedAt)}
            </div>
          </div>
          
          <h1 className="text-3xl font-medium leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-muted-foreground">
            {article.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="aspect-video rounded-lg overflow-hidden">
            <ImageWithFallback
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-sm max-w-none">
          {extendedContent.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="text-xl font-medium mt-8 mb-4">
                  {paragraph.replace('##', '').trim()}
                </h2>
              );
            } else if (paragraph.startsWith('###')) {
              return (
                <h3 key={index} className="text-lg font-medium mt-6 mb-3">
                  {paragraph.replace('###', '').trim()}
                </h3>
              );
            } else if (paragraph.startsWith('- ')) {
              return (
                <li key={index} className="ml-4 mb-1">
                  {paragraph.replace('- ', '').trim()}
                </li>
              );
            } else if (paragraph.startsWith('1. ') || paragraph.match(/^\d+\./)) {
              return (
                <li key={index} className="ml-4 mb-1 list-decimal">
                  {paragraph.replace(/^\d+\.\s*/, '').trim()}
                </li>
              );
            } else if (paragraph.trim()) {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph.trim()}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Related Actions */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-medium">この記事が参考になりましたか？</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              👍 役に立った
            </Button>
            <Button size="sm" variant="outline">
              📝 もっと詳しく知りたい
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                AIトレーナーに相談
              </span>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              この記事について質問がありますか？AIトレーナーが詳しく説明します。
            </p>
            <Button
              size="sm"
              onClick={() => onNavigate('ai-consultation')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              AIに質問する
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}