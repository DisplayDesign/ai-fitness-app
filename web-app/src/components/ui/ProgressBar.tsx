import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-red-500 to-orange-500',
    secondary: 'bg-gradient-to-r from-orange-500 to-yellow-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    danger: 'bg-gradient-to-r from-red-600 to-red-700',
  };
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className={cn('font-medium text-gray-700', labelSizeClasses[size])}>
            {label || '進捗'}
          </span>
          <span className={cn('font-semibold text-gray-900', labelSizeClasses[size])}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// 筋トレ特化プログレスバー
interface FitnessProgressBarProps extends ProgressBarProps {
  type: 'strength' | 'endurance' | 'flexibility' | 'weight' | 'muscle';
  currentValue: number;
  targetValue: number;
  unit?: string;
}

export function FitnessProgressBar({
  type,
  currentValue,
  targetValue,
  unit = '',
  className,
  ...props
}: FitnessProgressBarProps) {
  const typeConfig = {
    strength: {
      variant: 'primary' as const,
      icon: '💪',
      label: '筋力',
      color: 'text-red-600',
    },
    endurance: {
      variant: 'secondary' as const,
      icon: '❤️',
      label: '持久力',
      color: 'text-orange-600',
    },
    flexibility: {
      variant: 'success' as const,
      icon: '🧘',
      label: '柔軟性',
      color: 'text-green-600',
    },
    weight: {
      variant: 'warning' as const,
      icon: '⚖️',
      label: '体重',
      color: 'text-yellow-600',
    },
    muscle: {
      variant: 'primary' as const,
      icon: '🏋️',
      label: '筋肉量',
      color: 'text-red-600',
    },
  };

  const config = typeConfig[type];
  const percentage = Math.min(Math.max((currentValue / targetValue) * 100, 0), 100);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <span className={cn('font-semibold', config.color)}>
            {config.label}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {currentValue}{unit} / {targetValue}{unit}
          </div>
          <div className="text-xs text-gray-500">
            {percentage >= 100 ? '目標達成！' : `${Math.round(percentage)}%`}
          </div>
        </div>
      </div>
      
      <ProgressBar
        value={percentage}
        variant={config.variant}
        showLabel={false}
        {...props}
      />
    </div>
  );
}

// ワークアウトセットプログレスバー
interface WorkoutSetProgressBarProps {
  completedSets: number;
  totalSets: number;
  currentExercise: string;
  className?: string;
}

export function WorkoutSetProgressBar({
  completedSets,
  totalSets,
  currentExercise,
  className,
}: WorkoutSetProgressBarProps) {
  const percentage = (completedSets / totalSets) * 100;
  
  return (
    <div className={cn('space-y-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏋️</span>
          <span className="font-semibold text-gray-900">{currentExercise}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            セット {completedSets} / {totalSets}
          </div>
          <div className="text-xs text-gray-500">
            {percentage >= 100 ? '完了！' : `${Math.round(percentage)}%`}
          </div>
        </div>
      </div>
      
      <ProgressBar
        value={percentage}
        variant="primary"
        size="lg"
        showLabel={false}
      />
      
      {completedSets < totalSets && (
        <div className="text-xs text-gray-600 text-center">
          次のセットを開始してください
        </div>
      )}
      
      {percentage >= 100 && (
        <div className="text-xs text-green-600 text-center font-medium">
          🎉 お疲れさまでした！このエクササイズは完了です
        </div>
      )}
    </div>
  );
} 