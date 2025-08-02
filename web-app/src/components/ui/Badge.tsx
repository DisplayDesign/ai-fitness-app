import React from 'react';
import { cn } from '@/lib/utils';
import { customClasses } from '@/lib/theme';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  children: React.ReactNode;
}

export function Badge({ variant = 'primary', className, children, ...props }: BadgeProps) {
  const variantClasses = {
    primary: customClasses.badge.primary,
    secondary: customClasses.badge.secondary,
    success: customClasses.badge.success,
    warning: customClasses.badge.warning,
  };

  return (
    <span
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

// 筋トレ特化バッジ
interface FitnessBadgeProps extends BadgeProps {
  type?: 'muscle' | 'cardio' | 'strength' | 'flexibility' | 'beginner' | 'intermediate' | 'advanced';
}

export function FitnessBadge({ type = 'muscle', className, children, ...props }: FitnessBadgeProps) {
  const typeClasses = {
    muscle: 'bg-red-100 text-red-800 border border-red-200',
    cardio: 'bg-orange-100 text-orange-800 border border-orange-200',
    strength: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    flexibility: 'bg-pink-100 text-pink-800 border border-pink-200',
    beginner: 'bg-green-100 text-green-800 border border-green-200',
    intermediate: 'bg-blue-100 text-blue-800 border border-blue-200',
    advanced: 'bg-purple-100 text-purple-800 border border-purple-200',
  };

  const typeIcons = {
    muscle: '💪',
    cardio: '❤️',
    strength: '🏋️',
    flexibility: '🧘',
    beginner: '🌱',
    intermediate: '🔥',
    advanced: '⚡',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
        typeClasses[type],
        className
      )}
      {...props}
    >
      <span>{typeIcons[type]}</span>
      {children}
    </span>
  );
}

// 目標バッジ
interface GoalBadgeProps extends BadgeProps {
  goal: 'muscle_gain' | 'weight_loss' | 'strength' | 'endurance';
}

export function GoalBadge({ goal, className, children, ...props }: GoalBadgeProps) {
  const goalClasses = {
    muscle_gain: 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border border-red-200',
    weight_loss: 'bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border border-green-200',
    strength: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200',
    endurance: 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200',
  };

  const goalIcons = {
    muscle_gain: '💪',
    weight_loss: '⚖️',
    strength: '🏋️',
    endurance: '🏃',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm',
        goalClasses[goal],
        className
      )}
      {...props}
    >
      <span className="text-lg">{goalIcons[goal]}</span>
      {children}
    </span>
  );
} 