import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../theme';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const navigation = useNavigation();

  const features = [
    {
      icon: 'fitness',
      title: 'パーソナライズ',
      description: 'あなたの目標とレベルに合わせた最適なトレーニングプラン',
      color: colors.primary,
    },
    {
      icon: 'trending-up',
      title: '進捗管理',
      description: 'トレーニングログとAIフィードバックで継続をサポート',
      color: colors.success,
    },
    {
      icon: 'chatbubbles',
      title: 'AIサポート',
      description: '24時間いつでも質問できるAIトレーナー',
      color: colors.secondary,
    },
    {
      icon: 'barbell',
      title: '正しいフォーム',
      description: '動画解説で安全で効果的なトレーニング',
      color: colors.warning,
    },
  ];

  const targetUsers = [
    {
      title: '初心者',
      description: 'トレーニングを始めたいけど何から始めればいいかわからない方',
      color: colors.primaryLight,
    },
    {
      title: '中級者',
      description: 'より効率的で効果的なトレーニングを求めている方',
      color: colors.success + '20',
    },
    {
      title: '忙しい方',
      description: '時間を効率的に使って理想の体を手に入れたい方',
      color: colors.secondaryLight,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ヘッダー */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="fitness" size={40} color={colors.white} />
            <Text style={styles.logoText}>AIフィットネス</Text>
          </View>
          <View style={styles.headerButtons}>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Auth' as never)}
              style={styles.headerButton}
              textColor={colors.white}
              buttonColor="transparent"
            >
              ログイン
            </Button>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Auth' as never)}
              style={styles.headerButton}
              buttonColor={colors.white}
              textColor={colors.primary}
            >
              無料で始める
            </Button>
          </View>
        </View>
      </LinearGradient>

      {/* ヒーローセクション */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          AI搭載パーソナル{'\n'}
          <Text style={styles.heroTitleHighlight}>トレーニング</Text>
        </Text>
        <Text style={styles.heroDescription}>
          科学的根拠に基づいたAIが、あなたに最適なトレーニングプランを生成。
          理想の体を効率的に手に入れましょう。
        </Text>
        <View style={styles.heroButtons}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Auth' as never)}
            style={styles.heroButton}
            buttonColor={colors.primary}
            textColor={colors.white}
          >
            無料で始める
          </Button>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.heroButton}
            textColor={colors.primary}
          >
            詳細を見る
          </Button>
        </View>
      </View>

      {/* 機能紹介 */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>機能紹介</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                <Ionicons name={feature.icon as any} size={24} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 対象ユーザー */}
      <View style={styles.targetSection}>
        <Text style={styles.sectionTitle}>こんな方におすすめ</Text>
        <View style={styles.targetGrid}>
          {targetUsers.map((user, index) => (
            <View key={index} style={[styles.targetCard, { backgroundColor: user.color }]}>
              <Text style={styles.targetTitle}>{user.title}</Text>
              <Text style={styles.targetDescription}>{user.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>今すぐ理想の体を手に入れよう</Text>
        <Text style={styles.ctaDescription}>
          無料で始められるAI搭載パーソナルトレーニング
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Auth' as never)}
          style={styles.ctaButton}
          buttonColor={colors.primary}
          textColor={colors.white}
        >
          無料で始める
        </Button>
      </View>

      {/* フッター */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerLogo}>
            <Ionicons name="fitness" size={24} color={colors.primary} />
            <Text style={styles.footerLogoText}>AIフィットネス</Text>
          </View>
          <Text style={styles.footerDescription}>
            科学的根拠に基づいたAI搭載パーソナルトレーニングアプリ
          </Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>利用規約</Text>
            <Text style={styles.footerLink}>プライバシーポリシー</Text>
            <Text style={styles.footerLink}>お問い合わせ</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: spacing.sm,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    borderRadius: borderRadius.md,
  },
  heroSection: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.dark,
  },
  heroTitleHighlight: {
    color: colors.primary,
  },
  heroDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.gray,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroButton: {
    borderRadius: borderRadius.md,
  },
  featuresSection: {
    padding: spacing.xl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.dark,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - spacing.xl * 3) / 2,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.dark,
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.gray,
    lineHeight: 16,
  },
  targetSection: {
    padding: spacing.xl,
  },
  targetGrid: {
    gap: spacing.md,
  },
  targetCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.small,
  },
  targetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    color: colors.dark,
  },
  targetDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
  ctaSection: {
    padding: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.dark,
  },
  ctaDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.gray,
  },
  ctaButton: {
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xl,
  },
  footer: {
    backgroundColor: colors.dark,
    padding: spacing.xl,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  footerLogoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: spacing.sm,
  },
  footerDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.grayLight,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  footerLink: {
    fontSize: 12,
    color: colors.grayLight,
  },
}); 