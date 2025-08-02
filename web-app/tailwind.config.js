/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 筋トレテーマカラーパレット
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
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FB923C 0%, #F59E0B 100%)',
        'gradient-dark': 'linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)',
        'gradient-light': 'linear-gradient(135deg, #FEF2F2 0%, #FFEDD5 100%)',
      },
      
      // シャドウ
      boxShadow: {
        'fitness-sm': '0 1px 2px 0 rgba(220, 38, 38, 0.05)',
        'fitness-md': '0 4px 6px -1px rgba(220, 38, 38, 0.1)',
        'fitness-lg': '0 10px 15px -3px rgba(220, 38, 38, 0.1)',
        'fitness-xl': '0 20px 25px -5px rgba(220, 38, 38, 0.1)',
        'fitness-2xl': '0 25px 50px -12px rgba(220, 38, 38, 0.25)',
      },
      
      // アニメーション - 筋トレテーマ強化版
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-fitness': 'pulseFitness 2s ease-in-out infinite',
        'bounce-fitness': 'bounceFitness 1.5s ease-in-out infinite',
        'glow-fitness': 'glowFitness 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseFitness: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        bounceFitness: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowFitness: {
          '0%': { boxShadow: '0 0 5px rgba(220, 38, 38, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)' },
        },
      },
      
      // フォント
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // スペーシング
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // ボーダーラジウス
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // トランジション
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      
      // スクロールバー
      scrollbar: {
        'fitness': '8px',
        'fitness-thin': '4px',
      },
    },
  },
  plugins: [
    // カスタムプラグイン
    function({ addUtilities, theme }) {
      const newUtilities = {
        // カスタムユーティリティクラス
        '.text-gradient-primary': {
          background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-secondary': {
          background: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.border-gradient-primary': {
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%) 1',
        },
        '.shadow-fitness': {
          boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.1), 0 2px 4px -1px rgba(220, 38, 38, 0.06)',
        },
        '.backdrop-blur-fitness': {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(254, 242, 242, 0.8)',
        },
      }
      addUtilities(newUtilities)
    },
    
    // スクロールバーカスタマイズ
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-fitness': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#F5F5F5',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#DC2626',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#B91C1C',
            },
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
} 