import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { User } from '../App';

interface ProfileScreenProps {
  user: User | null;
  onSave: (profileData: Partial<User>) => void;
  isSetup: boolean;
}

export function ProfileScreen({ user, onSave, isSetup }: ProfileScreenProps) {
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age?.toString() || '');
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(user?.fitnessLevel || 'beginner');
  const [goals, setGoals] = useState<string[]>(user?.goals || []);

  const goalOptions = [
    { id: 'weight-loss', label: '体重減少' },
    { id: 'muscle-gain', label: '筋力アップ' },
    { id: 'endurance', label: '持久力向上' },
    { id: 'flexibility', label: '柔軟性向上' },
    { id: 'general-fitness', label: '全体的な健康' },
    { id: 'strength', label: '筋力向上' }
  ];

  const handleGoalChange = (goalId: string, checked: boolean) => {
    if (checked) {
      setGoals(prev => [...prev, goalOptions.find(g => g.id === goalId)?.label || '']);
    } else {
      setGoals(prev => prev.filter(g => g !== goalOptions.find(opt => opt.id === goalId)?.label));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      age: age ? parseInt(age) : undefined,
      fitnessLevel,
      goals
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          {!isSetup && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-2xl font-medium">
            {isSetup ? 'プロフィール設定' : 'プロフィール編集'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isSetup ? '基本情報を入力してください' : 'プロフィール情報'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="お名前を入力"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">年齢</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="年齢を入力"
                  min="1"
                  max="120"
                />
              </div>

              <div className="space-y-2">
                <Label>フィットネスレベル</Label>
                <Select value={fitnessLevel} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setFitnessLevel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">初心者</SelectItem>
                    <SelectItem value="intermediate">中級者</SelectItem>
                    <SelectItem value="advanced">上級者</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>目標（複数選択可）</Label>
                <div className="grid grid-cols-1 gap-3">
                  {goalOptions.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal.id}
                        checked={goals.includes(goal.label)}
                        onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
                      />
                      <Label htmlFor={goal.id} className="text-sm">
                        {goal.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                {isSetup ? '保存して開始' : '保存'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}