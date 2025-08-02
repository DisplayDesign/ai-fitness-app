# AIフィットネス - クロスプラットフォームアプリ

AI搭載パーソナルトレーニングアプリケーション（Android、iOS、Web対応）

## 📱 対応プラットフォーム

- **Android**: React Native + Expo
- **iOS**: React Native + Expo  
- **Web**: React Native Web + Expo

## 🚀 機能

### コア機能
- **ユーザー認証**: Firebase Authentication
- **プロフィール管理**: 個人情報とトレーニング目標の設定
- **AIトレーニングプラン生成**: 個人に最適化されたトレーニング計画
- **トレーニングログ**: 進捗記録とAIフィードバック
- **AIチャット**: 24時間質問対応のAIトレーナー
- **エクササイズデータベース**: 正しいフォームと動画解説
- **フィットネス記事**: 科学的根拠に基づいた知識

### 技術的特徴
- **クロスプラットフォーム**: 1つのコードベースで3つのプラットフォーム対応
- **オフライン対応**: データのローカル保存と同期
- **プッシュ通知**: トレーニングリマインダー
- **セキュアストレージ**: 機密データの安全な保存
- **リアルタイム同期**: Firestoreによるデータ同期

## 🛠 技術スタック

### フロントエンド
- **React Native**: 0.73.6
- **Expo**: 50.0.0
- **React Navigation**: 6.1.9
- **React Native Paper**: 5.12.1
- **TypeScript**: 5.1.3

### バックエンド
- **Firebase Authentication**: ユーザー認証
- **Firestore**: データベース
- **Firebase Functions**: サーバーレス関数

### 開発ツール
- **Expo CLI**: 開発・ビルドツール
- **ESLint**: コード品質管理
- **TypeScript**: 型安全性

## 📦 インストール

### 前提条件
- Node.js 18以上
- npm または yarn
- Expo CLI
- Android Studio（Android開発用）
- Xcode（iOS開発用）

### セットアップ

1. **リポジトリのクローン**
```bash
git clone <repository-url>
cd ai-fitness-app
```

2. **依存関係のインストール**
```bash
npm install
```

3. **環境変数の設定**
```bash
cp env.example .env.local
```
`.env.local`ファイルにFirebase設定を追加：
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. **開発サーバーの起動**
```bash
# Web版
npm run web

# Android版
npm run android

# iOS版
npm run ios

# 全プラットフォーム
npm start
```

## 🏗 プロジェクト構造

```
ai-fitness-app/
├── App.tsx                 # メインアプリケーション
├── app.json               # Expo設定
├── package.json           # 依存関係
├── src/
│   ├── contexts/          # React Context
│   │   └── AuthContext.tsx
│   ├── lib/              # ユーティリティ
│   │   ├── firebase.ts
│   │   └── utils.ts
│   ├── screens/          # 画面コンポーネント
│   │   ├── LandingScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── TrainingLogScreen.tsx
│   │   ├── AIChatScreen.tsx
│   │   ├── ExercisesScreen.tsx
│   │   ├── ArticlesScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── LoadingScreen.tsx
│   ├── theme/            # テーマ設定
│   │   └── index.ts
│   └── types/            # TypeScript型定義
│       └── index.ts
├── assets/               # 静的ファイル
└── docs/                 # ドキュメント
```

## 📱 プラットフォーム別の特徴

### Android
- **Material Design**: Android標準のデザインガイドライン
- **通知**: Android通知システム
- **ファイルシステム**: Androidストレージアクセス
- **カメラ**: トレーニング動画撮影
- **位置情報**: ジム検索機能

### iOS
- **Human Interface Guidelines**: iOS標準のデザインガイドライン
- **通知**: iOS通知システム
- **HealthKit**: 健康データ連携
- **カメラ**: トレーニング動画撮影
- **位置情報**: ジム検索機能

### Web
- **レスポンシブデザイン**: デスクトップ・タブレット対応
- **PWA**: プログレッシブウェブアプリ
- **オフライン対応**: Service Worker
- **キーボード操作**: アクセシビリティ対応

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm start

# プラットフォーム別起動
npm run android
npm run ios
npm run web

# ビルド
npm run build:android
npm run build:ios
npm run build:web

# テスト
npm test

# リント
npm run lint
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
  difficulty: string,
  equipment: string[]
}
```

#### articles
```typescript
{
  article_id: string,
  title: string,
  content: string,
  category: string,
  published_at: Timestamp
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

### Android
```bash
# APKビルド
expo build:android

# AABビルド（Google Play用）
expo build:android --type app-bundle
```

### iOS
```bash
# IPAビルド
expo build:ios

# App Store用
expo build:ios --type archive
```

### Web
```bash
# 静的ファイル生成
expo build:web

# デプロイ
npm run deploy:web
```

## 📈 パフォーマンス最適化

### 画像最適化
- WebP形式の使用
- 適切なサイズでの画像配信
- 遅延読み込み

### コード分割
- 動的インポート
- プラットフォーム別コード分割
- 不要なライブラリの削除

### キャッシュ戦略
- Firestoreオフラインキャッシュ
- 画像キャッシュ
- APIレスポンスキャッシュ

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
