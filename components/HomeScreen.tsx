import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Settings, 
  Play,
  Target,
  TrendingUp
} from 'lucide-react';
import { User, Screen } from '../App';

interface HomeScreenProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ user, onNavigate }: HomeScreenProps) {
  const todayDate = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">
              こんにちは、{user?.name}さん
            </h1>
            <p className="text-muted-foreground">{todayDate}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Today's Plan Card */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              今日のプラン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">上半身トレーニング</p>
                  <p className="text-sm opacity-90">6つのエクササイズ・約45分</p>
                </div>
                <Play className="h-8 w-8 opacity-75" />
              </div>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => onNavigate('training-detail')}
              >
                トレーニングを開始
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              今週の進捗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-medium text-primary">4</div>
                <div className="text-sm text-muted-foreground">完了セッション</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-primary">180</div>
                <div className="text-sm text-muted-foreground">分</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-primary">1,250</div>
                <div className="text-sm text-muted-foreground">カロリー</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Actions */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 justify-start"
                onClick={() => onNavigate('ai-consultation')}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">AIに相談</div>
                    <div className="text-sm text-muted-foreground">
                      トレーニングや栄養について質問
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 justify-start"
                onClick={() => onNavigate('article-list')}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">記事を読む</div>
                    <div className="text-sm text-muted-foreground">
                      最新のフィットネス情報をチェック
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 justify-start"
                onClick={() => onNavigate('progress-input')}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">週の成果を記録</div>
                    <div className="text-sm text-muted-foreground">
                      進捗を入力してフィードバックを受ける
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}