import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { customStyles } from '../theme';

interface FitnessCardProps {
  variant?: 'primary' | 'gradient' | 'dark';
  children: React.ReactNode;
  style?: any;
}

export function FitnessCard({ variant = 'primary', children, style }: FitnessCardProps) {
  const cardStyle = [customStyles.card[variant], style];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

interface FitnessCardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  style?: any;
}

export function FitnessCardHeader({ title, subtitle, icon, style }: FitnessCardHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

interface FitnessCardContentProps {
  children: React.ReactNode;
  style?: any;
}

export function FitnessCardContent({ children, style }: FitnessCardContentProps) {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
}

interface FitnessCardFooterProps {
  children: React.ReactNode;
  style?: any;
}

export function FitnessCardFooter({ children, style }: FitnessCardFooterProps) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}

// 筋トレ特化カード
interface WorkoutCardProps {
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscle: string;
  onPress?: () => void;
  style?: any;
}

export function WorkoutCard({
  exerciseName,
  sets,
  reps,
  weight,
  difficulty,
  targetMuscle,
  onPress,
  style,
}: WorkoutCardProps) {
  const difficultyConfig = {
    beginner: { color: '#10B981', icon: '🌱', label: '初心者' },
    intermediate: { color: '#F59E0B', icon: '🔥', label: '中級者' },
    advanced: { color: '#DC2626', icon: '⚡', label: '上級者' },
  };

  const config = difficultyConfig[difficulty];

  return (
    <FitnessCard variant="primary" style={[styles.workoutCard, style]}>
      <FitnessCardHeader
        title={exerciseName}
        subtitle={targetMuscle}
        icon="🏋️"
      />
      
      <FitnessCardContent>
        <View style={styles.workoutDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>セット数</Text>
            <Text style={styles.detailValue}>{sets}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>回数</Text>
            <Text style={styles.detailValue}>{reps}</Text>
          </View>
          
          {weight && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>重量</Text>
              <Text style={styles.detailValue}>{weight}kg</Text>
            </View>
          )}
        </View>
        
        <View style={[styles.difficultyBadge, { backgroundColor: `${config.color}20` }]}>
          <Text style={styles.difficultyIcon}>{config.icon}</Text>
          <Text style={[styles.difficultyText, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
      </FitnessCardContent>
    </FitnessCard>
  );
}

// 進捗カード
interface ProgressCardProps {
  title: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  type: 'strength' | 'endurance' | 'weight' | 'muscle';
  style?: any;
}

export function ProgressCard({
  title,
  currentValue,
  targetValue,
  unit,
  type,
  style,
}: ProgressCardProps) {
  const typeConfig = {
    strength: { icon: '💪', color: '#DC2626' },
    endurance: { icon: '❤️', color: '#EA580C' },
    weight: { icon: '⚖️', color: '#F59E0B' },
    muscle: { icon: '🏋️', color: '#DC2626' },
  };

  const config = typeConfig[type];
  const percentage = Math.min((currentValue / targetValue) * 100, 100);

  return (
    <FitnessCard variant="gradient" style={[styles.progressCard, style]}>
      <FitnessCardHeader
        title={title}
        icon={config.icon}
      />
      
      <FitnessCardContent>
        <View style={styles.progressInfo}>
          <Text style={styles.progressValue}>
            {currentValue}{unit} / {targetValue}{unit}
          </Text>
          <Text style={[styles.progressPercentage, { color: config.color }]}>
            {Math.round(percentage)}%
          </Text>
        </View>
        
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${percentage}%`, backgroundColor: config.color }
            ]}
          />
        </View>
        
        {percentage >= 100 && (
          <Text style={styles.completionText}>🎉 目標達成！</Text>
        )}
      </FitnessCardContent>
    </FitnessCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },
  subtitle: {
    fontSize: 14,
    color: '#525252',
    marginTop: 2,
  },
  content: {
    paddingTop: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  
  // ワークアウトカード専用スタイル
  workoutCard: {
    marginBottom: 16,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#525252',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171717',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  // 進捗カード専用スタイル
  progressCard: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    textAlign: 'center',
    marginTop: 8,
  },
}); 