import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Search, Clock, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen, Article } from '../App';

interface ArticleListScreenProps {
  onNavigate: (screen: Screen) => void;
  onArticleSelect: (article: Article) => void;
}

export function ArticleListScreen({ onNavigate, onArticleSelect }: ArticleListScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mockArticles: Article[] = [
    {
      id: '1',
      title: '筋トレ初心者が知っておくべき基本的なルール',
      excerpt: '効果的なトレーニングを始めるための基本的な知識とポイントをご紹介します。',
      content: '筋トレを始める際に知っておくべき基本的なルールについて詳しく説明します...',
      category: 'トレーニング',
      publishedAt: '2024-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'プロテインの種類と効果的な摂取タイミング',
      excerpt: '様々なプロテインの種類と、それぞれの効果的な摂取タイミングについて解説します。',
      content: 'プロテインの基本的な知識から、効果的な摂取方法まで詳しく説明します...',
      category: '栄養',
      publishedAt: '2024-01-12',
      imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: '自宅でできる効果的なカーディオトレーニング',
      excerpt: '器具を使わずに自宅でできる有酸素運動の方法をご紹介します。',
      content: 'HIIT（高強度インターバルトレーニング）から軽い有酸素運動まで...',
      category: '自宅トレーニング',
      publishedAt: '2024-01-10',
      imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'ダイエット成功のための食事管理術',
      excerpt: '健康的に体重を減らすための食事の基本的な考え方と実践方法をお教えします。',
      content: 'カロリー計算から栄養バランスまで、ダイエットに必要な食事管理について...',
      category: '栄養',
      publishedAt: '2024-01-08',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop'
    },
    {
      id: '5',
      title: '肩こり解消のためのストレッチとエクササイズ',
      excerpt: 'デスクワークが多い方におすすめの肩こり解消法をご紹介します。',
      content: '肩こりの原因から効果的な解消方法まで、詳しく説明します...',
      category: '健康',
      publishedAt: '2024-01-05',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop'
    },
    {
      id: '6',
      title: 'スクワットの正しいフォームとバリエーション',
      excerpt: '下半身強化に効果的なスクワットの正しいやり方と様々なバリエーションを解説します。',
      content: 'スクワットの基本フォームから上級者向けのバリエーションまで...',
      category: 'トレーニング',
      publishedAt: '2024-01-03',
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=200&fit=crop'
    }
  ];

  const categories = ['all', 'トレーニング', '栄養', '自宅トレーニング', '健康'];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-medium">記事一覧</h1>
              <p className="text-muted-foreground">最新のフィットネス情報</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="記事を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category === 'all' ? 'すべて' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => onArticleSelect(article)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>
                    <h3 className="font-medium mb-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              検索条件に一致する記事が見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}