import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Screen, Exercise } from '../App';

interface ExerciseDetailScreenProps {
  exercise: Exercise | null;
  onNavigate: (screen: Screen) => void;
}

export function ExerciseDetailScreen({ exercise, onNavigate }: ExerciseDetailScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isPlaying && timer !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextSet = () => {
    if (exercise && currentSet < exercise.sets!) {
      setCurrentSet(prev => prev + 1);
      setTimer(0);
      setIsPlaying(false);
    }
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsPlaying(false);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('training-detail')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <p className="mt-4 text-center text-muted-foreground">
            エクササイズが見つかりません
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('training-detail')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-medium">{exercise.name}</h1>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>
        </div>

        {/* Video/Image Placeholder */}
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">エクササイズ動画</p>
                <p className="text-sm text-muted-foreground mt-1">
                  タップで再生
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Info */}
        <Card>
          <CardHeader>
            <CardTitle>エクササイズ詳細</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Badge variant="secondary">
                {exercise.sets} セット
              </Badge>
              <Badge variant="secondary">
                {exercise.reps} 回
              </Badge>
              {exercise.duration && (
                <Badge variant="secondary">
                  {exercise.duration}
                </Badge>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-2">実行方法</h4>
              <ol className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Timer and Set Counter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>現在のセット</span>
              <Badge variant="outline">
                {currentSet}/{exercise.sets}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-mono font-medium text-primary">
                {formatTime(timer)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                経過時間
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    一時停止
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    開始
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetTimer}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full"
            onClick={handleNextSet}
            disabled={currentSet >= exercise.sets!}
          >
            {currentSet >= exercise.sets! ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                セット完了
              </>
            ) : (
              `次のセット (${currentSet + 1}/${exercise.sets})`
            )}
          </Button>
          
          {currentSet >= exercise.sets! && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-medium">
                エクササイズが完了しました！
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}