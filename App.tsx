import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { TrainingDetailScreen } from './components/TrainingDetailScreen';
import { ExerciseDetailScreen } from './components/ExerciseDetailScreen';
import { ProgressInputScreen } from './components/ProgressInputScreen';
import { AIConsultationScreen } from './components/AIConsultationScreen';
import { ArticleListScreen } from './components/ArticleListScreen';
import { ArticleDetailScreen } from './components/ArticleDetailScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';

export type Screen = 
  | 'home'
  | 'training-detail'
  | 'exercise-detail'
  | 'progress-input'
  | 'ai-consultation'
  | 'article-list'
  | 'article-detail'
  | 'settings'
  | 'profile-edit';

export type User = {
  id: string;
  email: string;
  name: string;
  age?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  instructions: string[];
  sets?: number;
  reps?: string;
  duration?: string;
};

export type TrainingPlan = {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
};

export type AIMessage = {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
};

// モックユーザーデータ
const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'ユーザー',
  fitnessLevel: 'intermediate',
  goals: ['筋力アップ', '体重減少']
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentScreen('exercise-detail');
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setCurrentScreen('article-detail');
  };

  const handleAIMessage = (message: string) => {
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message,
      timestamp: new Date().toISOString()
    };
    
    setAiMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: generateAIResponse(message),
        timestamp: new Date().toISOString()
      };
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "それは素晴らしいですね！継続することが最も重要です。",
      "トレーニングの頻度を少し調整してみることをお勧めします。",
      "栄養摂取も考慮に入れて、バランスの良い食事を心がけましょう。",
      "休息も重要な要素です。十分な睡眠を取るようにしてください。",
      "目標に向かって順調に進んでいますね。このまま続けましょう！"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen user={mockUser} onNavigate={handleNavigation} />;
      case 'training-detail':
        return (
          <TrainingDetailScreen
            onNavigate={handleNavigation}
            onExerciseSelect={handleExerciseSelect}
          />
        );
      case 'exercise-detail':
        return (
          <ExerciseDetailScreen
            exercise={selectedExercise}
            onNavigate={handleNavigation}
          />
        );
      case 'progress-input':
        return (
          <ProgressInputScreen
            onNavigate={handleNavigation}
            onSubmitProgress={handleAIMessage}
          />
        );
      case 'ai-consultation':
        return (
          <AIConsultationScreen
            messages={aiMessages}
            onSendMessage={handleAIMessage}
            onNavigate={handleNavigation}
          />
        );
      case 'article-list':
        return (
          <ArticleListScreen
            onNavigate={handleNavigation}
            onArticleSelect={handleArticleSelect}
          />
        );
      case 'article-detail':
        return (
          <ArticleDetailScreen
            article={selectedArticle}
            onNavigate={handleNavigation}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            user={mockUser}
            onNavigate={handleNavigation}
            onLogout={() => {}}
          />
        );
      case 'profile-edit':
        return (
          <ProfileScreen
            user={mockUser}
            onSave={(data) => {
              setCurrentScreen('settings');
            }}
            isSetup={false}
          />
        );
      default:
        return <HomeScreen user={mockUser} onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
}