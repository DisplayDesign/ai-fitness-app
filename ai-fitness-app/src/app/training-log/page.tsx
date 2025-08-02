'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrainingLog, TrainingPlan, User } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { generateUUID, convertTimestamp } from '@/lib/utils';
import { ArrowLeft, Plus, MessageCircle } from 'lucide-react';
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

export default function TrainingLogPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);
  const [newLog, setNewLog] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // 現在のトレーニングプランを取得
      const plansRef = collection(db, 'training_plans');
      const planQuery = query(plansRef, where('user_id', '==', mockUser.user_id));
      const planSnapshot = await getDocs(planQuery);
      
      if (!planSnapshot.empty) {
        const planData = planSnapshot.docs[0].data() as TrainingPlan;
        setCurrentPlan(planData);
      }

      // トレーニングログを取得
      const logsRef = collection(db, 'training_logs');
      const logsQuery = query(
        logsRef, 
        where('user_id', '==', mockUser.user_id),
        orderBy('submitted_at', 'desc')
      );
      const logsSnapshot = await getDocs(logsQuery);
      
      const logsData = logsSnapshot.docs.map(doc => doc.data() as TrainingLog);
      setLogs(logsData);
    } catch (error) {
      console.error('データ読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitLog = async () => {
    if (!newLog.trim() || !currentPlan) return;

    try {
      setSubmitting(true);
      
      const log: TrainingLog = {
        log_id: generateUUID(),
        user_id: mockUser.user_id,
        plan_id: currentPlan.plan_id,
        log_content: newLog,
        submitted_at: new Date()
      };

      await addDoc(collection(db, 'training_logs'), log);
      setLogs([log, ...logs]);
      setNewLog('');
      
      // AIフィードバックを生成（サンプル）
      setTimeout(() => {
        alert('AIフィードバック: 素晴らしいトレーニングでした！継続することが大切です。次回は重量を少し上げてみることをお勧めします。');
      }, 1000);
    } catch (error) {
      console.error('ログ送信エラー:', error);
      alert('ログの送信に失敗しました');
    } finally {
      setSubmitting(false);
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
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
              <h1 className="text-xl font-bold text-gray-900">トレーニングログ</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 現在のプラン情報 */}
        {currentPlan && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>現在のトレーニングプラン</CardTitle>
              <CardDescription>
                開始日: {convertTimestamp(currentPlan.start_date).toLocaleDateString('ja-JP')}
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        )}

        {/* 新しいログの入力 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>トレーニングログを記録</CardTitle>
            <CardDescription>
              今日のトレーニングの感想や進捗を記録してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                value={newLog}
                onChange={(e) => setNewLog(e.target.value)}
                placeholder="例: 今日はスクワットを3セット行いました。前回より重量を5kg上げて、より良い刺激を得られました。明日は胸のトレーニングを予定しています。"
                className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  AIがあなたのログを分析して、パーソナライズされたアドバイスを提供します
                </p>
                <Button
                  onClick={submitLog}
                  disabled={!newLog.trim() || submitting}
                  loading={submitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  ログを送信
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 過去のログ */}
        <Card>
          <CardHeader>
            <CardTitle>過去のトレーニングログ</CardTitle>
            <CardDescription>
              あなたのトレーニング履歴
            </CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">まだトレーニングログがありません</p>
                <p className="text-sm text-gray-400">最初のログを記録してみましょう！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-gray-500">
                        {convertTimestamp(log.submitted_at).toLocaleDateString('ja-JP')} {convertTimestamp(log.submitted_at).toLocaleTimeString('ja-JP')}
                      </p>
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap">{log.log_content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 