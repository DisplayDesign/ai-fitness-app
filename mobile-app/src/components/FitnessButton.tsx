import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { customStyles } from '../theme';

interface FitnessButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
  textStyle?: any;
}

export function FitnessButton({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onPress,
  style,
  textStyle,
}: FitnessButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = customStyles.button[variant];
    const sizeStyle = sizeStyles[size];
    return [baseStyle, sizeStyle, style];
  };

  const getTextStyle = () => {
    const baseTextStyle = textStyles[variant];
    const sizeTextStyle = textSizeStyles[size];
    return [baseTextStyle, sizeTextStyle, textStyle];
  };

  const sizeStyles = {
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
  };

  const textStyles = {
    primary: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    secondary: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    outline: {
      color: '#DC2626',
      fontWeight: '600',
    },
    ghost: {
      color: '#DC2626',
      fontWeight: '600',
    },
  };

  const textSizeStyles = {
    sm: {
      fontSize: 14,
    },
    md: {
      fontSize: 16,
    },
    lg: {
      fontSize: 18,
    },
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#DC2626' : '#FFFFFF'}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

// 筋トレ特化ボタン
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
      title: '🏋️ ワークアウト開始',
      variant: 'primary' as const,
      icon: '▶️',
    },
    pause: {
      title: '⏸️ 一時停止',
      variant: 'secondary' as const,
      icon: '⏸️',
    },
    resume: {
      title: '▶️ 再開',
      variant: 'primary' as const,
      icon: '▶️',
    },
    complete: {
      title: '✅ 完了',
      variant: 'primary' as const,
      icon: '✅',
    },
    skip: {
      title: '⏭️ スキップ',
      variant: 'outline' as const,
      icon: '⏭️',
    },
  };

  const config = typeConfig[type];
  const title = exerciseName ? `${config.icon} ${exerciseName}` : config.title;

  return (
    <FitnessButton
      title={title}
      variant={config.variant}
      {...props}
    />
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
      title: '💪 筋力アップ',
      variant: 'primary' as const,
      icon: '💪',
    },
    weight_loss: {
      title: '⚖️ 減量',
      variant: 'secondary' as const,
      icon: '⚖️',
    },
    strength: {
      title: '🏋️ 筋力強化',
      variant: 'primary' as const,
      icon: '🏋️',
    },
    endurance: {
      title: '🏃 持久力向上',
      variant: 'secondary' as const,
      icon: '🏃',
    },
  };

  const config = goalConfig[goal];

  return (
    <FitnessButton
      title={config.title}
      variant={config.variant}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  // カスタムスタイルがあれば追加
}); 