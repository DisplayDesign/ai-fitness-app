'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { AIChatLog, ChatMessage, User } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { generateUUID, convertTimestamp } from '@/lib/utils';
import { ArrowLeft, Send, Bot, User as UserIcon } from 'lucide-react';
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

export default function AIChatPage() {
  const router = useRouter();
  const [currentChat, setCurrentChat] = useState<AIChatLog | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadOrCreateChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadOrCreateChat = async () => {
    try {
      setLoading(true);
      
      // 既存のチャットを検索
      const chatsRef = collection(db, 'ai_chat_logs');
      const chatQuery = query(
        chatsRef, 
        where('user_id', '==', mockUser.user_id),
        orderBy('created_at', 'desc')
      );
      const chatSnapshot = await getDocs(chatQuery);
      
      if (!chatSnapshot.empty) {
        const chatData = chatSnapshot.docs[0].data() as AIChatLog;
        setCurrentChat(chatData);
      } else {
        // 新しいチャットを作成
        const newChat: AIChatLog = {
          chat_id: generateUUID(),
          user_id: mockUser.user_id,
          messages: [
            {
              role: 'assistant',
              content: 'こんにちは！AIトレーナーです。トレーニングについて何でもお聞きください。例えば：\n\n• エクササイズの正しいフォーム\n• トレーニングの頻度や強度\n• 栄養や食事について\n• 怪我の予防方法\n\nどのようなことでもお気軽にご相談ください！',
              timestamp: new Date()
            }
          ],
          created_at: new Date()
        };
        
        await addDoc(collection(db, 'ai_chat_logs'), newChat);
        setCurrentChat(newChat);
      }
    } catch (error) {
      console.error('チャット読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !currentChat) return;

    try {
      setSending(true);
      
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date()
      };

      // メッセージを追加
      const updatedMessages = [...currentChat.messages, userMessage];
      const updatedChat = { ...currentChat, messages: updatedMessages };
      setCurrentChat(updatedChat);
      setMessage('');

      // AIレスポンスを生成（サンプル）
      setTimeout(async () => {
        const aiResponse = generateAIResponse(message);
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        };

        const finalMessages = [...updatedMessages, aiMessage];
        const finalChat = { ...currentChat, messages: finalMessages };
        setCurrentChat(finalChat);

        // Firestoreを更新
        try {
          const chatDoc = doc(db, 'ai_chat_logs', currentChat.chat_id);
          await updateDoc(chatDoc, { messages: finalMessages });
        } catch (error) {
          console.error('チャット更新エラー:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
    } finally {
      setSending(false);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('スクワット') || message.includes('squat')) {
      return `スクワットについてですね！

**正しいフォームのポイント：**
• 足幅は肩幅程度
• つま先は少し外側に向ける
• 膝がつま先より前に出ないように
• お尻を後ろに突き出すイメージ
• 太ももが地面と平行になるまで下げる

**初心者向けのアドバイス：**
• まずは自重スクワットから始める
• 鏡を見ながらフォームを確認
• 10回×3セットから始める
• 筋肉痛が治ってから次のトレーニング

何か他にご質問はありますか？`;
    }
    
    if (message.includes('プッシュアップ') || message.includes('pushup')) {
      return `プッシュアップについてですね！

**正しいフォームのポイント：**
• 手の位置は肩幅より少し広め
• 体を一直線に保つ
• 肘を体の横に近づける
• 胸が地面に近づくまで下げる
• 呼吸を忘れずに

**初心者向けのバリエーション：**
• 膝つきプッシュアップ
• 壁プッシュアップ
• 段差を使ったプッシュアップ

**セット数：**
• 初心者：5-10回×3セット
• 中級者：10-20回×3-4セット

フォームでお困りの点があれば、詳しくお答えします！`;
    }
    
    if (message.includes('栄養') || message.includes('食事') || message.includes('プロテイン')) {
      return `栄養についてですね！

**タンパク質の重要性：**
• 体重1kgあたり1.6-2.2gが推奨
• 筋肉の修復と成長に必要
• トレーニング後30分以内に摂取

**良質なタンパク質源：**
• 鶏肉（胸肉）
• 魚（マグロ、サーモン）
• 卵
• 乳製品
• 豆類

**食事のタイミング：**
• トレーニング前：2-3時間前
• トレーニング後：30分以内
• 就寝前：1-2時間前

**プロテインサプリメント：**
• 食事で不足する場合の補助
• ホエイプロテインがおすすめ
• 1日20-30gを目安

具体的な食事プランについても相談できます！`;
    }
    
    if (message.includes('頻度') || message.includes('回数') || message.includes('スケジュール')) {
      return `トレーニングの頻度についてですね！

**初心者向けのスケジュール：**
• 週2-3回
• 1回あたり30-60分
• 筋肉痛が治ってから次のトレーニング

**分割法の例：**
• 月曜：胸・三頭筋
• 水曜：背中・二頭筋
• 金曜：脚・肩

**重要なポイント：**
• 継続が何より大切
• 無理のない頻度から始める
• 休息日も大切
• 徐々に頻度を上げる

あなたの現在のレベルや目標に合わせて、より具体的なアドバイスができます！`;
    }
    
    if (message.includes('怪我') || message.includes('痛み') || message.includes('予防')) {
      return `怪我の予防についてですね！

**怪我を防ぐためのポイント：**
• ウォームアップを必ず行う
• 正しいフォームを保つ
• 無理な重量を上げない
• 十分な休息を取る
• 痛みがある場合は即座に中止

**ウォームアップの例：**
• 軽い有酸素運動（5-10分）
• 動的ストレッチ
• 軽い重量での準備運動

**痛みが出た場合：**
• トレーニングを中止
• 氷で冷やす
• 必要に応じて医師に相談

**予防のためのストレッチ：**
• トレーニング前後に行う
• 各部位20-30秒
• 痛みのない範囲で

何か具体的な痛みや不安があれば、詳しくお聞かせください！`;
    }
    
    // デフォルトレスポンス
    return `ありがとうございます！その質問について詳しくお答えします。

トレーニングについて、より具体的に教えていただけますか？例えば：

• どのエクササイズについて知りたいですか？
• 現在のトレーニングレベルは？
• 目標は何ですか？（筋力向上、減量、健康維持など）

より詳しい情報をいただければ、あなたに最適なアドバイスができます！`;
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
              <h1 className="text-xl font-bold text-gray-900">AIトレーナー</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-600" />
              AIトレーナーとのチャット
            </CardTitle>
            <CardDescription>
              トレーニングについて何でもお聞きください
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* メッセージエリア */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {currentChat?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {msg.role === 'user' ? (
                        <UserIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <Bot className="h-3 w-3 mr-1" />
                      )}
                      <span className="text-xs opacity-75">
                        {msg.role === 'user' ? 'あなた' : 'AIトレーナー'}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {convertTimestamp(msg.timestamp).toLocaleTimeString('ja-JP')}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 入力エリア */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="メッセージを入力..."
                className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={sending}
              />
              <Button
                onClick={sendMessage}
                disabled={!message.trim() || sending}
                loading={sending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 