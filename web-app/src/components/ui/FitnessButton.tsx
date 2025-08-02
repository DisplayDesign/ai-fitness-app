import React from 'react';
import { cn } from '@/lib/utils';

interface FitnessButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'workout' | 'goal' | 'progress' | 'motivation';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  icon?: string;
}

export function FitnessButton({
  variant = 'workout',
  size = 'md',
  loading = false,
  className,
  children,
  icon,
  disabled,
  ...props
}: FitnessButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';
  
  const variantClasses = {
    workout: 'bg-gradient-to-r from-red-500 via-red-600 to-orange-600 hover:from-red-600 hover:via-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl focus:ring-red-200',
    goal: 'bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 hover:from-orange-600 hover:via-orange-700 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl focus:ring-orange-200',
    progress: 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-500 hover:from-green-600 hover:via-green-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl focus:ring-green-200',
    motivation: 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-200',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {children}
    </button>
  );
}

// ワークアウト特化ボタン
interface WorkoutButtonProps extends FitnessButtonProps {
  type: 'start' | 'pause' | 'resume' | 'complete' | 'skip';
  exerciseName?: string;
}

export function WorkoutButton({
  type,
  exerciseName,
  ...props
}: WorkoutButtonProps) {
  const typeConfig = {
    start: {
      icon: '🏋️',
      text: 'ワークアウト開始',
      variant: 'workout' as const,
    },
    pause: {
      icon: '⏸️',
      text: '一時停止',
      variant: 'goal' as const,
    },
    resume: {
      icon: '▶️',
      text: '再開',
      variant: 'workout' as const,
    },
    complete: {
      icon: '✅',
      text: '完了',
      variant: 'progress' as const,
    },
    skip: {
      icon: '⏭️',
      text: 'スキップ',
      variant: 'motivation' as const,
    },
  };

  const config = typeConfig[type];
  const displayText = exerciseName ? `${config.icon} ${exerciseName}` : `${config.icon} ${config.text}`;

  return (
    <FitnessButton
      variant={config.variant}
      icon={config.icon}
      {...props}
    >
      {displayText}
    </FitnessButton>
  );
}

// 目標設定ボタン
interface GoalButtonProps extends FitnessButtonProps {
  goal: 'muscle_gain' | 'weight_loss' | 'strength' | 'endurance';
}

export function GoalButton({
  goal,
  ...props
}: GoalButtonProps) {
  const goalConfig = {
    muscle_gain: {
      icon: '💪',
      text: '筋力アップ',
      variant: 'workout' as const,
    },
    weight_loss: {
      icon: '⚖️',
      text: '減量',
      variant: 'goal' as const,
    },
    strength: {
      icon: '🏋️',
      text: '筋力強化',
      variant: 'workout' as const,
    },
    endurance: {
      icon: '🏃',
      text: '持久力向上',
      variant: 'progress' as const,
    },
  };

  const config = goalConfig[goal];

  return (
    <FitnessButton
      variant={config.variant}
      icon={config.icon}
      {...props}
    >
      {config.text}
    </FitnessButton>
  );
}

// モチベーションボタン
interface MotivationButtonProps extends FitnessButtonProps {
  message: string;
  emoji?: string;
}

export function MotivationButton({
  message,
  emoji = '🔥',
  ...props
}: MotivationButtonProps) {
  return (
    <FitnessButton
      variant="motivation"
      icon={emoji}
      className="animate-pulse-fitness"
      {...props}
    >
      {message}
    </FitnessButton>
  );
} 