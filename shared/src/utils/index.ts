// UUID生成
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// FirestoreタイムスタンプをDateに変換
export function convertTimestamp(timestamp: any): Date {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return new Date(timestamp);
}

// 日付フォーマット
export function formatDate(date: Date, locale: string = 'ja-JP'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 時間フォーマット
export function formatTime(date: Date, locale: string = 'ja-JP'): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// パスワード強度チェック
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('パスワードは6文字以上で入力してください');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('大文字を含めてください');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('小文字を含めてください');
  }
  
  if (!/\d/.test(password)) {
    errors.push('数字を含めてください');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// メールアドレスバリデーション
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// BMI計算
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// BMI分類
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return '低体重';
  if (bmi < 25) return '普通体重';
  if (bmi < 30) return '肥満（1度）';
  if (bmi < 35) return '肥満（2度）';
  return '肥満（3度）';
}

// 目標テキスト変換
export function getGoalText(goal: string): string {
  switch (goal) {
    case 'muscle_gain': return '筋力アップ';
    case 'weight_loss': return '減量';
    case 'strength': return '筋力強化';
    case 'endurance': return '持久力向上';
    default: return goal;
  }
}

// 経験レベルテキスト変換
export function getHistoryText(history: string): string {
  switch (history) {
    case 'beginner': return '初心者';
    case 'intermediate': return '中級者';
    case 'advanced': return '上級者';
    default: return history;
  }
} 