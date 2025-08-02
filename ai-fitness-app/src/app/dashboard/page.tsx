'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrainingPlan, Exercise, User } from '@/types';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { generateUUID } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Dumbbell,
  Target,
  TrendingUp,
  MessageCircle,
  BookOpen,
  Settings,
  User as UserIcon
} from 'lucide-react';

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

export default function DashboardPage() {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentPlan();
  }, []);

  const loadCurrentPlan = async () => {
    try {
      const plansRef = collection(db, 'training_plans');
      const q = query(plansRef, where('user_id', '==', mockUser.user_id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const planData = querySnapshot.docs[0].data() as TrainingPlan;
        setCurrentPlan(planData);
      }
    } catch (error) {
      console.error('プラン読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAITrainingPlan = async () => {
    try {
      setLoading(true);
      
      // サンプルエクササイズデータ（実際のアプリではFirestoreから取得）
      const sampleExercises = [
        {
          exercise_id: '1',
          name: 'プッシュアップ',
          sets: 3,
          reps: 10,
          rest_time: 60
        },
        {
          exercise_id: '2',
          name: 'スクワット',
          sets: 3,
          reps: 15,
          rest_time: 90
        },
        {
          exercise_id: '3',
          name: 'プランク',
          sets: 3,
          reps: 30,
          rest_time: 60
        }
      ];

      const newPlan: TrainingPlan = {
        plan_id: generateUUID(),
        user_id: mockUser.user_id,
        plan_data: {
          exercises: sampleExercises
        },
        start_date: new Date(),
        created_at: new Date()
      };

      await addDoc(collection(db, 'training_plans'), newPlan);
      setCurrentPlan(newPlan);
    } catch (error) {
      console.error('プラン生成エラー:', error);
    } finally {
      setLoading(false);
    }
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
              <Dumbbell className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">AIフィットネス</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ようこそ、{mockUser.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ユーザー情報 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              プロフィール情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">性別</p>
                <p className="font-medium">{mockUser.profile.gender === 'male' ? '男性' : '女性'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">身長</p>
                <p className="font-medium">{mockUser.profile.height}cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">体重</p>
                <p className="font-medium">{mockUser.profile.weight}kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">目標</p>
                <p className="font-medium">
                  {mockUser.profile.goal === 'muscle_gain' ? '筋肉増強' :
                   mockUser.profile.goal === 'weight_loss' ? '減量' : '維持'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* メイン機能 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* トレーニングプラン */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                トレーニングプラン
              </CardTitle>
              <CardDescription>
                AIが生成したパーソナライズされたトレーニングプラン
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentPlan ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    開始日: {currentPlan.start_date.toLocaleDateString('ja-JP')}
                  </p>
                  <div className="space-y-2">
                    {currentPlan.plan_data.exercises.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{exercise.name}</span>
                        <span className="text-xs text-gray-500">
                          {exercise.sets}セット × {exercise.reps}回
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline">
                    詳細を見る
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    まだトレーニングプランがありません
                  </p>
                  <Button 
                    onClick={generateAITrainingPlan}
                    loading={loading}
                    className="w-full"
                  >
                    AIプランを生成
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* トレーニングログ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                トレーニングログ
              </CardTitle>
              <CardDescription>
                週間のトレーニング結果を記録
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                トレーニングの進捗や感想を記録して、AIからのフィードバックを受け取れます
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/training-log')}
              >
                ログを記録
              </Button>
            </CardContent>
          </Card>

          {/* AIチャット */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                AIトレーナー
              </CardTitle>
              <CardDescription>
                トレーニングに関する質問や相談
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                AIトレーナーに質問して、パーソナライズされたアドバイスを受け取れます
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/ai-chat')}
              >
                チャットを開始
              </Button>
            </CardContent>
          </Card>

          {/* エクササイズデータベース */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Dumbbell className="h-5 w-5 mr-2" />
                エクササイズDB
              </CardTitle>
              <CardDescription>
                正しいフォームと動画解説
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                各種エクササイズの正しいフォームと動画解説を確認できます
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/exercises')}
              >
                エクササイズを検索
              </Button>
            </CardContent>
          </Card>

          {/* フィットネス記事 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                フィットネス記事
              </CardTitle>
              <CardDescription>
                トレーニング科学と栄養学
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                科学的根拠に基づいたトレーニングと栄養の知識を学べます
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/articles')}
              >
                記事を読む
              </Button>
            </CardContent>
          </Card>

          {/* 設定 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                設定
              </CardTitle>
              <CardDescription>
                アカウントとアプリの設定
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                プロフィールの編集やアカウントの管理を行えます
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/settings')}
              >
                設定を開く
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 