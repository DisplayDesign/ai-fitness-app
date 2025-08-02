// 筋トレテーマカラーパレット
export const theme = {
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
    
    // ニュートラルカラー
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // セマンティックカラー
    success: '#10B981', // 緑（成功・完了）
    warning: '#F59E0B', // 黄（警告）
    error: '#EF4444',   // 赤（エラー）
    info: '#3B82F6',    // 青（情報）
  },
  
  // グラデーション
  gradients: {
    primary: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
    secondary: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)',
    accent: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 100%)',
    dark: 'linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)',
  },
  
  // シャドウ
  shadows: {
    sm: '0 1px 2px 0 rgba(220, 38, 38, 0.05)',
    md: '0 4px 6px -1px rgba(220, 38, 38, 0.1)',
    lg: '0 10px 15px -3px rgba(220, 38, 38, 0.1)',
    xl: '0 20px 25px -5px rgba(220, 38, 38, 0.1)',
  },
  
  // ボーダーラジウス
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  
  // スペーシング
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // タイポグラフィ
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
};

// Tailwind CSS用のカスタムクラス
export const customClasses = {
  // ボタンスタイル - 筋トレテーマ強化版
  button: {
    primary: 'bg-gradient-to-r from-red-500 via-red-600 to-orange-600 hover:from-red-600 hover:via-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 hover:from-orange-600 hover:via-orange-700 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    outline: 'border-3 border-red-500 text-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
    ghost: 'text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-md transform hover:scale-105 active:scale-95',
  },
  
  // カードスタイル - 筋トレテーマ強化版
  card: {
    primary: 'bg-white rounded-2xl shadow-xl border border-red-100 hover:shadow-2xl transition-all duration-300 hover:border-red-200',
    gradient: 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl shadow-xl border border-red-200 hover:shadow-2xl transition-all duration-300',
    dark: 'bg-gradient-to-br from-red-800 via-red-900 to-orange-900 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300',
  },
  
  // 入力フィールド - 筋トレテーマ強化版
  input: {
    primary: 'border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 rounded-xl px-4 py-3 transition-all duration-300 bg-white hover:border-red-300',
    error: 'border-2 border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100 rounded-xl px-4 py-3 transition-all duration-300',
  },
  
  // バッジ - 筋トレテーマ強化版
  badge: {
    primary: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-3 py-1.5 rounded-full text-sm font-bold border border-red-300 shadow-sm',
    secondary: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1.5 rounded-full text-sm font-bold border border-orange-300 shadow-sm',
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1.5 rounded-full text-sm font-bold border border-green-300 shadow-sm',
    warning: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold border border-yellow-300 shadow-sm',
  },
};

export default theme; 