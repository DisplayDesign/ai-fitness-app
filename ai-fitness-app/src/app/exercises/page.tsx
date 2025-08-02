'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Exercise, User } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowLeft, Search, Play, Target, Info } from 'lucide-react';
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

export default function ExercisesPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchTerm, selectedCategory]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      
      // サンプルエクササイズデータ（実際のアプリではFirestoreから取得）
      const sampleExercises: Exercise[] = [
        {
          exercise_id: '1',
          name: 'プッシュアップ',
          description: '胸、肩、腕の筋肉を鍛える基本的なエクササイズです。正しいフォームで行うことが重要です。',
          video_url: 'https://example.com/pushup-video.mp4',
          target_part: 'chest'
        },
        {
          exercise_id: '2',
          name: 'スクワット',
          description: '下半身全体を鍛える効果的なエクササイズです。太もも、お尻、ふくらはぎを同時に鍛えられます。',
          video_url: 'https://example.com/squat-video.mp4',
          target_part: 'legs'
        },
        {
          exercise_id: '3',
          name: 'プランク',
          description: '体幹を鍛える静的エクササイズです。腹筋、背筋、肩の安定性を向上させます。',
          video_url: 'https://example.com/plank-video.mp4',
          target_part: 'core'
        },
        {
          exercise_id: '4',
          name: 'プルアップ',
          description: '背中と腕の筋肉を鍛える上級者向けエクササイズです。懸垂バーが必要です。',
          video_url: 'https://example.com/pullup-video.mp4',
          target_part: 'back'
        },
        {
          exercise_id: '5',
          name: 'デッドリフト',
          description: '全身の筋力を鍛える複合エクササイズです。正しいフォームが特に重要です。',
          video_url: 'https://example.com/deadlift-video.mp4',
          target_part: 'back'
        },
        {
          exercise_id: '6',
          name: 'ベンチプレス',
          description: '胸の筋肉を鍛える代表的なエクササイズです。バーベルとベンチが必要です。',
          video_url: 'https://example.com/benchpress-video.mp4',
          target_part: 'chest'
        },
        {
          exercise_id: '7',
          name: 'オーバーヘッドプレス',
          description: '肩の筋肉を鍛えるエクササイズです。バーベルまたはダンベルを使用します。',
          video_url: 'https://example.com/overheadpress-video.mp4',
          target_part: 'shoulders'
        },
        {
          exercise_id: '8',
          name: 'レッグプレス',
          description: 'マシンを使用して脚の筋肉を鍛えるエクササイズです。初心者にも安全です。',
          video_url: 'https://example.com/legpress-video.mp4',
          target_part: 'legs'
        }
      ];

      setExercises(sampleExercises);
    } catch (error) {
      console.error('エクササイズ読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    // カテゴリでフィルタリング
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => exercise.target_part === selectedCategory);
    }

    // 検索語でフィルタリング
    if (searchTerm) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExercises(filtered);
  };

  const getCategoryName = (category: string): string => {
    const categories: { [key: string]: string } = {
      chest: '胸',
      back: '背中',
      legs: '脚',
      shoulders: '肩',
      arms: '腕',
      core: '体幹',
      all: 'すべて'
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      chest: 'bg-red-100 text-red-800',
      back: 'bg-blue-100 text-blue-800',
      legs: 'bg-green-100 text-green-800',
      shoulders: 'bg-purple-100 text-purple-800',
      arms: 'bg-orange-100 text-orange-800',
      core: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
              <h1 className="text-xl font-bold text-gray-900">エクササイズデータベース</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 検索とフィルター */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>エクササイズを検索</CardTitle>
            <CardDescription>
              正しいフォームと動画解説で安全で効果的なトレーニング
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 検索バー */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="エクササイズ名で検索..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* カテゴリフィルター */}
              <div className="flex flex-wrap gap-2">
                {['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getCategoryName(category)}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* エクササイズ一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.exercise_id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(exercise.target_part)}`}>
                      {getCategoryName(exercise.target_part)}
                    </span>
                  </div>
                  <Target className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {exercise.description}
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedExercise(exercise)}
                    className="flex-1"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    詳細
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(exercise.video_url, '_blank')}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    動画
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 結果が0件の場合 */}
        {filteredExercises.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">エクササイズが見つかりません</h3>
              <p className="text-gray-500">
                検索条件を変更して、もう一度お試しください。
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* 詳細モーダル */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedExercise.name}</CardTitle>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedExercise.target_part)}`}>
                    {getCategoryName(selectedExercise.target_part)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedExercise(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">説明</h4>
                  <p className="text-gray-600">{selectedExercise.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">正しいフォームのポイント</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 呼吸を忘れずに行う</li>
                    <li>• 正しい姿勢を保つ</li>
                    <li>• 無理のない範囲で行う</li>
                    <li>• 筋肉を意識して動かす</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">セット数・回数の目安</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">初心者</p>
                      <p className="text-gray-600">3セット × 8-12回</p>
                    </div>
                    <div>
                      <p className="font-medium">中級者</p>
                      <p className="text-gray-600">4セット × 10-15回</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => window.open(selectedExercise.video_url, '_blank')}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    動画を見る
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedExercise(null)}
                    className="flex-1"
                  >
                    閉じる
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 