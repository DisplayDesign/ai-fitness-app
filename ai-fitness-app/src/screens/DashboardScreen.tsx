import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Text, Card, Button, Avatar, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { TrainingPlan } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { generateUUID } from '../lib/utils';
import { colors, spacing, borderRadius, shadows } from '../theme';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      if (user) {
        // 現在のトレーニングプランを取得
        const plansQuery = query(
          collection(db, 'training_plans'),
          where('user_id', '==', user.user_id),
          where('start_date', '<=', new Date())
        );
        const plansSnapshot = await getDocs(plansQuery);
        
        if (!plansSnapshot.empty) {
          const planData = plansSnapshot.docs[0].data() as TrainingPlan;
          setCurrentPlan(planData);
        } else {
          // プランがない場合は新しいプランを生成
          await generateNewPlan();
        }
      }
    } catch (error) {
      console.error('データ読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewPlan = async () => {
    try {
      if (!user) return;

      const newPlan: TrainingPlan = {
        plan_id: generateUUID(),
        user_id: user.user_id,
        plan_data: {
          exercises: [
            { name: 'スクワット', sets: 3, reps: 10, weight: 0 },
            { name: 'プッシュアップ', sets: 3, reps: 10, weight: 0 },
            { name: 'プランク', sets: 3, reps: 30, weight: 0 },
          ],
          duration: 7,
          difficulty: 'beginner',
        },
        start_date: new Date(),
        created_at: new Date(),
      };

      await addDoc(collection(db, 'training_plans'), newPlan);
      setCurrentPlan(newPlan);
    } catch (error) {
      console.error('プラン生成エラー:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const getGoalText = (goal: string) => {
    switch (goal) {
      case 'muscle_gain': return '筋力アップ';
      case 'weight_loss': return '減量';
      case 'strength': return '筋力強化';
      case 'endurance': return '持久力向上';
      default: return goal;
    }
  };

  const getHistoryText = (history: string) => {
    switch (history) {
      case 'beginner': return '初心者';
      case 'intermediate': return '中級者';
      case 'advanced': return '上級者';
      default: return history;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* ヘッダー */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Avatar.Text
              size={50}
              label={user?.profile.name?.charAt(0) || 'U'}
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.profile.name || 'ユーザー'}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>連続日数</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>達成率</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* プロフィール情報 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>プロフィール情報</Text>
            <View style={styles.profileGrid}>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>目標</Text>
                <Chip mode="outlined" style={styles.chip}>
                  {getGoalText(user?.profile.goal || '')}
                </Chip>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>経験レベル</Text>
                <Chip mode="outlined" style={styles.chip}>
                  {getHistoryText(user?.profile.training_history || '')}
                </Chip>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>身長</Text>
                <Text style={styles.profileValue}>{user?.profile.height}cm</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>体重</Text>
                <Text style={styles.profileValue}>{user?.profile.weight}kg</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* 現在のトレーニングプラン */}
        {currentPlan && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>現在のトレーニングプラン</Text>
              <Text style={styles.planDate}>
                開始日: {currentPlan.start_date.toLocaleDateString('ja-JP')}
              </Text>
              <View style={styles.exercisesList}>
                {currentPlan.plan_data.exercises.map((exercise, index) => (
                  <View key={index} style={styles.exerciseItem}>
                    <Ionicons name="fitness" size={20} color={colors.primary} />
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseDetails}>
                      {exercise.sets}セット × {exercise.reps}回
                    </Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* クイックアクション */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>クイックアクション</Text>
          <View style={styles.actionGrid}>
            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionContent}>
                <Ionicons name="fitness" size={32} color={colors.primary} />
                <Text style={styles.actionTitle}>トレーニングログ</Text>
                <Text style={styles.actionDescription}>
                  今日のトレーニングを記録
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionContent}>
                <Ionicons name="chatbubbles" size={32} color={colors.secondary} />
                <Text style={styles.actionTitle}>AIトレーナー</Text>
                <Text style={styles.actionDescription}>
                  質問やアドバイスを求める
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionContent}>
                <Ionicons name="barbell" size={32} color={colors.success} />
                <Text style={styles.actionTitle}>エクササイズ</Text>
                <Text style={styles.actionDescription}>
                  正しいフォームを確認
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.actionCard}>
              <Card.Content style={styles.actionContent}>
                <Ionicons name="book" size={32} color={colors.warning} />
                <Text style={styles.actionTitle}>記事</Text>
                <Text style={styles.actionDescription}>
                  トレーニング知識を学ぶ
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* 今日の目標 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>今日の目標</Text>
            <View style={styles.goalItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.goalText}>スクワット 3セット × 10回</Text>
            </View>
            <View style={styles.goalItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.goalText}>プッシュアップ 3セット × 10回</Text>
            </View>
            <View style={styles.goalItem}>
              <Ionicons name="ellipse-outline" size={24} color={colors.gray} />
              <Text style={[styles.goalText, styles.pendingGoal]}>プランク 3セット × 30秒</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.white + '20',
  },
  userDetails: {
    marginLeft: spacing.md,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  userEmail: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.dark,
  },
  planDate: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.md,
  },
  exercisesList: {
    gap: spacing.sm,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.light,
    borderRadius: borderRadius.md,
  },
  exerciseName: {
    flex: 1,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
  exerciseDetails: {
    fontSize: 12,
    color: colors.gray,
  },
  quickActions: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.dark,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - spacing.lg * 3) / 2,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  actionContent: {
    alignItems: 'center',
    padding: spacing.md,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  profileItem: {
    width: '48%',
  },
  profileLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalText: {
    marginLeft: spacing.sm,
    fontSize: 16,
  },
  pendingGoal: {
    color: colors.gray,
  },
}); 