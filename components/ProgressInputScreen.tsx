import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ArrowLeft, Send, TrendingUp } from 'lucide-react';
import { Screen } from '../App';

interface ProgressInputScreenProps {
  onNavigate: (screen: Screen) => void;
  onSubmitProgress: (progress: string) => void;
}

export function ProgressInputScreen({ onNavigate, onSubmitProgress }: ProgressInputScreenProps) {
  const [workoutFrequency, setWorkoutFrequency] = useState('');
  const [difficulty, setDifficulty] = useState([5]);
  const [energy, setEnergy] = useState([5]);
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [achievements, setAchievements] = useState('');
  const [challenges, setChallenges] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const progressData = {
      workoutFrequency,
      difficulty: difficulty[0],
      energy: energy[0],
      weight,
      bodyFat,
      achievements,
      challenges,
      notes
    };

    const progressMessage = `
今週の成果報告：
- トレーニング頻度: ${workoutFrequency}回/週
- 難易度評価: ${difficulty[0]}/10
- エネルギーレベル: ${energy[0]}/10
- 体重: ${weight}kg
- 体脂肪率: ${bodyFat}%
- 達成できたこと: ${achievements}
- 困ったこと: ${challenges}
- その他のメモ: ${notes}
    `.trim();

    onSubmitProgress(progressMessage);
    onNavigate('ai-consultation');
  };

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
            <h1 className="text-2xl font-medium">週の成果を記録</h1>
            <p className="text-muted-foreground">
              進捗を入力してAIからフィードバックを受けましょう
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Workout Frequency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                トレーニング頻度
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>今週のトレーニング回数</Label>
                <Select value={workoutFrequency} onValueChange={setWorkoutFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0回</SelectItem>
                    <SelectItem value="1">1回</SelectItem>
                    <SelectItem value="2">2回</SelectItem>
                    <SelectItem value="3">3回</SelectItem>
                    <SelectItem value="4">4回</SelectItem>
                    <SelectItem value="5">5回</SelectItem>
                    <SelectItem value="6">6回</SelectItem>
                    <SelectItem value="7">7回</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>トレーニングの難易度 (1-10)</Label>
                <Slider
                  value={difficulty}
                  onValueChange={setDifficulty}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>とても簡単</span>
                  <span className="font-medium">{difficulty[0]}</span>
                  <span>とても難しい</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>エネルギーレベル (1-10)</Label>
                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>とても疲れた</span>
                  <span className="font-medium">{energy[0]}</span>
                  <span>とても元気</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Body Measurements */}
          <Card>
            <CardHeader>
              <CardTitle>体の測定値</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">体重 (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="65.5"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">体脂肪率 (%)</Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    placeholder="15.2"
                    step="0.1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements and Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>振り返り</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="achievements">達成できたこと</Label>
                <Textarea
                  id="achievements"
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  placeholder="例：初めて10回連続でプッシュアップができた"
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">困ったこと・課題</Label>
                <Textarea
                  id="challenges"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="例：肩が痛くて途中で止めることがあった"
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">その他のメモ</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="例：来週は頻度を増やしたい"
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!workoutFrequency}
          >
            <Send className="h-4 w-4 mr-2" />
            送信してAIからフィードバックを受ける
          </Button>
        </form>
      </div>
    </div>
  );
}