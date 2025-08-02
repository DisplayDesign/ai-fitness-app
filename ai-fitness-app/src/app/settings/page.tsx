'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserProfile, User } from '@/types';
import { convertTimestamp } from '@/lib/utils';
import { ArrowLeft, User as UserIcon, Shield, Save } from 'lucide-react';
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

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: mockUser.profile.gender,
    height: mockUser.profile.height,
    weight: mockUser.profile.weight,
    history: mockUser.profile.training_history,
    goal: mockUser.profile.goal
  });

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      // モック更新処理
      setTimeout(() => {
        alert('プロフィールが更新されました');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('プロフィール更新エラー:', error);
      alert('プロフィールの更新に失敗しました');
      setLoading(false);
    }
  };

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
              <h1 className="text-xl font-bold text-gray-900">設定</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* プロフィール設定 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              プロフィール設定
            </CardTitle>
            <CardDescription>
              あなたの基本情報を更新できます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  性別
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'male' | 'female' })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="身長 (cm)"
                  type="number"
                  value={profile.height}
                  onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                  min="100"
                  max="250"
                />

                <Input
                  label="体重 (kg)"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                  min="30"
                  max="200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  トレーニング経験
                </label>
                <select
                  value={profile.history}
                  onChange={(e) => setProfile({ ...profile, history: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">初心者</option>
                  <option value="intermediate">中級者</option>
                  <option value="advanced">上級者</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  目標
                </label>
                <select
                  value={profile.goal}
                  onChange={(e) => setProfile({ ...profile, goal: e.target.value as 'muscle_gain' | 'weight_loss' | 'maintenance' })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="muscle_gain">筋肉増強</option>
                  <option value="weight_loss">減量</option>
                  <option value="maintenance">維持</option>
                </select>
              </div>

              <Button
                onClick={handleProfileUpdate}
                loading={loading}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                プロフィールを更新
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* アカウント情報 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              アカウント情報
            </CardTitle>
            <CardDescription>
              アカウントの基本情報
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={mockUser.email}
                  disabled
                  className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  メールアドレスの変更は現在サポートされていません
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  アカウント作成日
                </label>
                <input
                  type="text"
                  value={convertTimestamp(mockUser.created_at).toLocaleDateString('ja-JP')}
                  disabled
                  className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 