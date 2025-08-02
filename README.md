# AIフィットネス - マルチプラットフォームアプリケーション

AI搭載パーソナルトレーニングアプリケーション（Web、Android、iOS対応）

## 📁 プロジェクト構造

```
ai-fitness-app/
├── shared/                 # 共有ライブラリ
│   ├── src/
│   │   ├── types/         # 型定義
│   │   ├── utils/         # ユーティリティ関数
│   │   ├── firebase/      # Firebase設定
│   │   └── index.ts       # エントリーポイント
│   ├── package.json
│   └── tsconfig.json
├── web-app/               # Next.js Webアプリケーション
│   ├── src/
│   │   ├── components/    # UIコンポーネント
│   │   ├── contexts/      # React Context
│   │   ├── lib/          # ユーティリティ
│   │   └── app/          # Next.js App Router
│   ├── package.json
│   └── next.config.js
├── mobile-app/            # React Native モバイルアプリ
│   ├── src/
│   │   ├── components/    # UIコンポーネント
│   │   ├── contexts/      # React Context
│   │   ├── screens/       # 画面コンポーネント
│   │   ├── navigation/    # ナビゲーション
│   │   └── theme/         # テーマ設定
│   ├── package.json
│   └── app.json
└── README.md
```

## 🚀 機能

### コア機能
- **ユーザー認証**: Firebase Authentication
- **プロフィール管理**: 個人情報とトレーニング目標の設定
- **AIトレーニングプラン生成**: 個人に最適化されたトレーニング計画
- **トレーニングログ**: 進捗記録とAIフィードバック
- **AIチャット**: 24時間質問対応のAIトレーナー
- **エクササイズデータベース**: 正しいフォームと動画解説
- **フィットネス記事**: 科学的根拠に基づいた知識

### プラットフォーム別特徴

#### Webアプリケーション（Next.js）
- **レスポンシブデザイン**: デスクトップ・タブレット対応
- **PWA対応**: プログレッシブウェブアプリ
- **SEO最適化**: サーバーサイドレンダリング
- **高速読み込み**: 画像最適化とコード分割

#### Androidアプリ（React Native）
- **Material Design**: Android標準デザインガイドライン
- **通知システム**: Android通知
- **ファイルシステム**: ストレージアクセス
- **カメラ機能**: トレーニング動画撮影

#### iOSアプリ（React Native）
- **Human Interface Guidelines**: iOS標準デザインガイドライン
- **通知システム**: iOS通知
- **HealthKit連携**: 健康データ連携
- **カメラ機能**: トレーニング動画撮影

## 🛠 技術スタック

### 共有ライブラリ
- **TypeScript**: 型安全性
- **Firebase**: 認証・データベース
- **共有型定義**: プラットフォーム間での一貫性

### Webアプリケーション
- **Next.js 15**: Reactフレームワーク
- **React 19**: UIライブラリ
- **Tailwind CSS**: スタイリング
- **React Hook Form**: フォーム管理
- **Framer Motion**: アニメーション

### モバイルアプリケーション
- **React Native 0.73**: クロスプラットフォーム開発
- **Expo 50**: 開発・ビルドツール
- **React Navigation**: ナビゲーション
- **React Native Paper**: Material Design
- **Expo SDK**: ネイティブ機能

## 📦 セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn
- Expo CLI（モバイル開発用）
- Android Studio（Android開発用）
- Xcode（iOS開発用）

### 1. 共有ライブラリのセットアップ

```bash
cd shared
npm install
npm run build
```

### 2. Webアプリケーションのセットアップ

```bash
cd web-app
npm install
cp .env.example .env.local
# .env.localにFirebase設定を追加
npm run dev
```

### 3. モバイルアプリケーションのセットアップ

```bash
cd mobile-app
npm install
cp .env.example .env.local
# .env.localにFirebase設定を追加
npm start
```

## 🔧 開発コマンド

### 共有ライブラリ
```bash
cd shared
npm run build    # TypeScriptコンパイル
npm run dev      # ウォッチモード
```

### Webアプリケーション
```bash
cd web-app
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # リント実行
```

### モバイルアプリケーション
```bash
cd mobile-app
npm start        # Expo開発サーバー起動
npm run android  # Androidエミュレーター起動
npm run ios      # iOSシミュレーター起動
npm run web      # Web版起動
```

## 📊 データベース設計

### Firestore Collections

#### users
```typescript
{
  user_id: string,
  email: string,
  profile: {
    name: string,
    gender: 'male' | 'female',
    height: number,
    weight: number,
    training_history: 'beginner' | 'intermediate' | 'advanced',
    goal: 'muscle_gain' | 'weight_loss' | 'strength' | 'endurance'
  },
  created_at: Timestamp,
  updated_at: Timestamp
}
```

#### training_plans
```typescript
{
  plan_id: string,
  user_id: string,
  plan_data: {
    exercises: Array<{
      name: string,
      sets: number,
      reps: number,
      weight: number
    }>,
    duration: number,
    difficulty: string
  },
  start_date: Date,
  created_at: Timestamp
}
```

#### training_logs
```typescript
{
  log_id: string,
  user_id: string,
  plan_id: string,
  log_content: string,
  submitted_at: Timestamp
}
```

#### ai_chat_logs
```typescript
{
  chat_id: string,
  user_id: string,
  messages: Array<{
    role: 'user' | 'ai',
    content: string,
    timestamp: Timestamp
  }>,
  created_at: Timestamp
}
```

#### exercises
```typescript
{
  exercise_id: string,
  name: string,
  description: string,
  video_url: string,
  target_part: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  equipment: string[],
  instructions: string[],
  tips: string[]
}
```

#### articles
```typescript
{
  article_id: string,
  title: string,
  content: string,
  category: 'training' | 'nutrition' | 'health' | 'motivation',
  published_at: Timestamp,
  author: string,
  tags: string[],
  image_url?: string
}
```

## 🔒 セキュリティ

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーは自分のデータのみアクセス可能
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /training_plans/{planId} {
      allow read, write: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    match /training_logs/{logId} {
      allow read, write: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    match /ai_chat_logs/{chatId} {
      allow read, write: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    // 公開データ
    match /exercises/{exerciseId} {
      allow read: if true;
    }
    
    match /articles/{articleId} {
      allow read: if true;
    }
  }
}
```

## 🚀 デプロイ

### Webアプリケーション
```bash
cd web-app
npm run build
# Vercel、Netlify、AWS等にデプロイ
```

### Androidアプリ
```bash
cd mobile-app
expo build:android
# Google Play Consoleにアップロード
```

### iOSアプリ
```bash
cd mobile-app
expo build:ios
# App Store Connectにアップロード
```

## 📈 パフォーマンス最適化

### Webアプリケーション
- **画像最適化**: Next.js Image component
- **コード分割**: 動的インポート
- **キャッシュ戦略**: Service Worker
- **SEO最適化**: メタデータと構造化データ

### モバイルアプリケーション
- **画像最適化**: Expo Image
- **コード分割**: 動的インポート
- **オフライン対応**: AsyncStorage
- **パフォーマンス監視**: Expo Performance

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 ライセンス

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 サポート

- **Email**: support@aifitness.com
- **Documentation**: [docs.aifitness.com](https://docs.aifitness.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🔮 今後の予定

### Phase 2
- [ ] 食事管理機能
- [ ] 進捗グラフ
- [ ] ソーシャル機能
- [ ] プッシュ通知
- [ ] 健康アプリ連携

### Phase 3
- [ ] ARトレーニング
- [ ] 音声コーチング
- [ ] グループトレーニング
- [ ] パーソナルトレーナー連携
- [ ] ウェアラブルデバイス連携

---

**AIフィットネス** - 科学的根拠に基づいたAI搭載パーソナルトレーニングアプリ 