import { MD3LightTheme, configureFonts } from 'react-native-paper';

// 筋トレテーマカラーパレット
export const fitnessTheme = {
  colors: {
    // プライマリカラー
    primary: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#DC2626', // メインカラー
      600: '#B91C1C',
      700: '#991B1B',
      800: '#7F1D1D',
      900: '#450A0A',
    },
    
    // オレンジカラー
    orange: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#EA580C', // メインオレンジ
      600: '#C2410C',
      700: '#9A3412',
      800: '#7C2D12',
      900: '#431407',
    },
    
    // アクセントカラー
    accent: {
      yellow: '#F59E0B', // 警告・注意
      pink: '#F87171',   // 女性向け
      lightOrange: '#FB923C', // 軽量・ウォームアップ
    },
    
    // セマンティックカラー
    success: '#10B981', // 緑（成功・完了）
    warning: '#F59E0B', // 黄（警告）
    error: '#EF4444',   // 赤（エラー）
    info: '#3B82F6',    // 青（情報）
  },
  
  // グラデーション
  gradients: {
    primary: ['#DC2626', '#EA580C'],
    secondary: ['#EA580C', '#FB923C'],
    accent: ['#FB923C', '#F59E0B'],
    dark: ['#991B1B', '#7F1D1D'],
  },
  
  // スペーシング
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  
  // ボーダーラジウス
  borderRadius: {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
  },
  
  // シャドウ
  shadows: {
    sm: {
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};

// React Native Paper用のテーマ設定
const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

export const paperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    // プライマリカラー
    primary: '#DC2626',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FEE2E2',
    onPrimaryContainer: '#450A0A',
    
    // セカンダリカラー
    secondary: '#EA580C',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFEDD5',
    onSecondaryContainer: '#431407',
    
    // テルティアリカラー
    tertiary: '#FB923C',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FED7AA',
    onTertiaryContainer: '#7C2D12',
    
    // エラーカラー
    error: '#EF4444',
    onError: '#FFFFFF',
    errorContainer: '#FEE2E2',
    onErrorContainer: '#450A0A',
    
    // 背景カラー
    background: '#FFFFFF',
    onBackground: '#171717',
    surface: '#FFFFFF',
    onSurface: '#171717',
    
    // 表面バリアント
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#525252',
    outline: '#D4D4D4',
    outlineVariant: '#E5E5E5',
    
    // シャドウ
    shadow: '#000000',
    scrim: '#000000',
    
    // 逆表面
    inverseSurface: '#262626',
    inverseOnSurface: '#FAFAFA',
    inversePrimary: '#FCA5A5',
    
    // エレベーション
    elevation: {
      level0: 'transparent',
      level1: '#FEF2F2',
      level2: '#FEE2E2',
      level3: '#FECACA',
      level4: '#FCA5A5',
      level5: '#F87171',
    },
    
    // 表面の明度
    surfaceDisabled: '#F5F5F5',
    onSurfaceDisabled: '#A3A3A3',
    
    // 背景の明度
    backdrop: 'rgba(0, 0, 0, 0.4)',
  },
};

// カスタムスタイル - 筋トレテーマ強化版
export const customStyles = {
  // ボタンスタイル
  button: {
    primary: {
      backgroundColor: '#DC2626',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 32,
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    secondary: {
      backgroundColor: '#EA580C',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 32,
      shadowColor: '#EA580C',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    outline: {
      borderWidth: 3,
      borderColor: '#DC2626',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 32,
    },
  },
  
  // カードスタイル - 筋トレテーマ強化版
  card: {
    primary: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#DC2626',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: '#FEE2E2',
    },
    gradient: {
      backgroundColor: '#FEF2F2',
      borderRadius: 16,
      padding: 20,
      borderWidth: 2,
      borderColor: '#FECACA',
    },
  },
  
  // 入力フィールド - 筋トレテーマ強化版
  input: {
    primary: {
      borderWidth: 2,
      borderColor: '#E5E5E5',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#FFFFFF',
    },
    focused: {
      borderColor: '#DC2626',
      borderWidth: 3,
    },
    error: {
      borderColor: '#EF4444',
      borderWidth: 3,
    },
  },
  
  // バッジ - 筋トレテーマ強化版
  badge: {
    primary: {
      backgroundColor: '#FEE2E2',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#FCA5A5',
    },
    secondary: {
      backgroundColor: '#FFEDD5',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#FDBA74',
    },
  },
};

export default fitnessTheme; 