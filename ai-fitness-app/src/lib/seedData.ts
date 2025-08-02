import { db } from './firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { Exercise, Article } from '@/types';

// サンプルエクササイズデータ
const sampleExercises: Omit<Exercise, 'exercise_id'>[] = [
  {
    name: 'プッシュアップ',
    description: '胸、肩、腕の筋肉を鍛える基本的なエクササイズです。正しいフォームで行うことが重要です。',
    video_url: 'https://example.com/pushup-video.mp4',
    target_part: 'chest'
  },
  {
    name: 'スクワット',
    description: '下半身全体を鍛える効果的なエクササイズです。太もも、お尻、ふくらはぎを同時に鍛えられます。',
    video_url: 'https://example.com/squat-video.mp4',
    target_part: 'legs'
  },
  {
    name: 'プランク',
    description: '体幹を鍛える静的エクササイズです。腹筋、背筋、肩の安定性を向上させます。',
    video_url: 'https://example.com/plank-video.mp4',
    target_part: 'core'
  },
  {
    name: 'プルアップ',
    description: '背中と腕の筋肉を鍛える上級者向けエクササイズです。懸垂バーが必要です。',
    video_url: 'https://example.com/pullup-video.mp4',
    target_part: 'back'
  }
];

// サンプル記事データ
const sampleArticles: Omit<Article, 'article_id'>[] = [
  {
    title: '筋力トレーニングの基礎知識',
    content: `
# 筋力トレーニングの基礎知識

## 1. 筋力トレーニングとは

筋力トレーニングは、筋肉に負荷をかけることで筋力を向上させる運動です。
適切に行うことで、以下の効果が期待できます：

- 筋力の向上
- 基礎代謝の向上
- 姿勢の改善
- 怪我の予防

## 2. 基本的な原則

### 過負荷の原則
筋肉は、普段より強い負荷をかけることで成長します。

### 漸進性の原則
負荷は徐々に増やしていくことが重要です。

### 継続性の原則
継続的に行うことで効果が現れます。

## 3. トレーニングの頻度

初心者の場合：
- 週2-3回
- 1回あたり30-60分
- 筋肉痛が治ってから次のトレーニング

## 4. 注意点

- 正しいフォームを保つ
- 無理をしない
- 十分な休息を取る
- 適切な栄養を摂る
    `,
    category: 'training',
    published_at: new Date()
  },
  {
    title: 'タンパク質の重要性',
    content: `
# タンパク質の重要性

## 1. タンパク質とは

タンパク質は、筋肉の構成要素となる重要な栄養素です。
筋力トレーニングを行う人は、特に意識して摂取する必要があります。

## 2. 1日の必要量

体重1kgあたり1.6-2.2gが推奨されています。
例：体重70kgの場合、112-154gのタンパク質が必要

## 3. 良質なタンパク質源

- 鶏肉（胸肉）
- 魚（マグロ、サーモン）
- 卵
- 乳製品（ギリシャヨーグルト）
- 豆類（豆腐、納豆）

## 4. 摂取のタイミング

- トレーニング前：2-3時間前
- トレーニング後：30分以内
- 就寝前：1-2時間前

## 5. 注意点

- 過剰摂取は腎臓に負担
- 水分を十分に摂る
- バランスの良い食事を心がける
    `,
    category: 'nutrition',
    published_at: new Date()
  }
];

// データをFirestoreに追加する関数
export async function seedData() {
  try {
    console.log('サンプルデータの作成を開始...');

    // エクササイズデータを追加
    for (const exercise of sampleExercises) {
      await addDoc(collection(db, 'exercises'), exercise);
      console.log(`エクササイズ追加: ${exercise.name}`);
    }

    // 記事データを追加
    for (const article of sampleArticles) {
      await addDoc(collection(db, 'articles'), article);
      console.log(`記事追加: ${article.title}`);
    }

    console.log('サンプルデータの作成が完了しました！');
  } catch (error) {
    console.error('サンプルデータ作成エラー:', error);
  }
}

// 開発環境でのみ実行
if (process.env.NODE_ENV === 'development') {
  // この関数は手動で呼び出す必要があります
  console.log('seedData関数が利用可能です。必要に応じて手動で実行してください。');
} 