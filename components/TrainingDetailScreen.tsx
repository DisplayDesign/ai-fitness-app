import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, Target, CheckCircle, Play } from 'lucide-react';
import { Screen, Exercise } from '../App';

interface TrainingDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  onExerciseSelect: (exercise: Exercise) => void;
}

export function TrainingDetailScreen({ onNavigate, onExerciseSelect }: TrainingDetailScreenProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const mockExercises: Exercise[] = [
    {
      id: '1',
      name: 'プッシュアップ',
      description: '胸筋と腕を鍛える基本的なエクササイズ',
      sets: 3,
      reps: '10-15',
      instructions: ['手を肩幅に開いて床につく', 'ゆっくりと胸を床に近づける', '元の位置に戻る'],
      videoUrl: 'https://example.com/pushup-video'
    },
    {
      id: '2',
      name: 'ダンベルカール',
      description: '上腕二頭筋を鍛えるエクササイズ',
      sets: 3,
      reps: '8-12',
      instructions: ['ダンベルを持ち、腕を伸ばす', 'ゆっくりと肘を曲げる', 'コントロールしながら下ろす'],
      videoUrl: 'https://example.com/curl-video'
    },
    {
      id: '3',
      name: 'ショルダープレス',
      description: '肩の筋肉を鍛えるエクササイズ',
      sets: 3,
      reps: '10-12',
      instructions: ['ダンベルを肩の位置に構える', '真上に押し上げる', 'ゆっくりと下ろす'],
      videoUrl: 'https://example.com/shoulder-press-video'
    },
    {
      id: '4',
      name: 'トライセプスエクステンション',
      description: '上腕三頭筋を鍛えるエクササイズ',
      sets: 3,
      reps: '10-15',
      instructions: ['ダンベルを頭上で持つ', '肘を固定して下ろす', 'ゆっくりと元に戻す'],
      videoUrl: 'https://example.com/triceps-video'
    },
    {
      id: '5',
      name: 'ベンチプレス',
      description: '胸筋を集中的に鍛えるエクササイズ',
      sets: 3,
      reps: '6-10',
      instructions: ['ベンチに仰向けになる', 'バーを胸に下ろす', '力強く押し上げる'],
      videoUrl: 'https://example.com/bench-press-video'
    },
    {
      id: '6',
      name: 'ラットプルダウン',
      description: '背中の筋肉を鍛えるエクササイズ',
      sets: 3,
      reps: '8-12',
      instructions: ['マシンに座り、バーを握る', '胸に向かって引く', 'ゆっくりと戻す'],
      videoUrl: 'https://example.com/lat-pulldown-video'
    }
  ];

  const toggleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const completedCount = completedExercises.size;
  const totalCount = mockExercises.length;
  const progress = (completedCount / totalCount) * 100;

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
          <div>
            <h1 className="text-2xl font-medium">上半身トレーニング</h1>
            <p className="text-muted-foreground">今日のプラン</p>
          </div>
        </div>

        {/* Progress Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-medium">進捗状況</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{totalCount} 完了
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <div className="space-y-4">
          {mockExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={`cursor-pointer transition-all ${
                completedExercises.has(exercise.id) ? 'bg-green-50 border-green-200' : 'hover:bg-accent'
              }`}
              onClick={() => onExerciseSelect(exercise)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{exercise.name}</h3>
                      {completedExercises.has(exercise.id) && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {exercise.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        {exercise.sets} セット
                      </Badge>
                      <Badge variant="secondary">
                        {exercise.reps} 回
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Play className="h-3 w-3" />
                        動画あり
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExerciseComplete(exercise.id);
                    }}
                  >
                    {completedExercises.has(exercise.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full"
            disabled={completedCount === 0}
            onClick={() => onNavigate('progress-input')}
          >
            <Clock className="h-4 w-4 mr-2" />
            週の成果を記録する
          </Button>
          
          {completedCount === totalCount && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-medium">
                すべてのエクササイズが完了しました！
              </p>
              <p className="text-sm text-green-600 mt-1">
                お疲れ様でした。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}