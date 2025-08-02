// ユーザープロフィール型
export interface UserProfile {
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  history: 'beginner' | 'intermediate' | 'advanced';
  goal: 'muscle_gain' | 'weight_loss' | 'maintenance';
}

// ユーザー型
export interface User {
  user_id: string;
  email: string;
  profile: UserProfile;
  created_at: Date;
  updated_at: Date;
}

// エクササイズ型
export interface Exercise {
  exercise_id: string;
  name: string;
  description: string;
  video_url: string;
  target_part: string;
}

// トレーニングプラン型
export interface TrainingPlan {
  plan_id: string;
  user_id: string;
  plan_data: {
    exercises: Array<{
      exercise_id: string;
      name: string;
      sets: number;
      reps: number;
      rest_time: number; // 秒
    }>;
  };
  start_date: Date;
  created_at: Date;
}

// トレーニングログ型
export interface TrainingLog {
  log_id: string;
  user_id: string;
  plan_id: string;
  log_content: string;
  submitted_at: Date;
}

// AIチャットメッセージ型
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// AIチャットログ型
export interface AIChatLog {
  chat_id: string;
  user_id: string;
  messages: ChatMessage[];
  created_at: Date;
}

// 記事型
export interface Article {
  article_id: string;
  title: string;
  content: string;
  category: 'training' | 'nutrition';
  published_at: Date;
}

// 目標設定型
export interface GoalSetting {
  goal: 'muscle_gain' | 'weight_loss' | 'maintenance';
  duration: number; // 週数
  target_weight?: number; // kg
} 