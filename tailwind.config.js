/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#05060B',
          1: '#090B13',
          2: '#10131E',
          3: '#171B28',
          4: '#222636',
          5: '#2D3145',
        },
        punk: {
          DEFAULT: '#FF2D6F',
          soft: '#FF5A8C',
          deep: '#D6185A',
          glow: 'rgba(255, 45, 111, 0.35)',
        },
        fog: {
          DEFAULT: '#E7E9F0',
          muted: '#8A8F9C',
          dim: '#5A5F6D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'punk-glow': '0 0 24px rgba(255, 45, 111, 0.35)',
        'punk-ring': '0 0 0 1px rgba(255, 45, 111, 0.5), 0 0 24px rgba(255, 45, 111, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'mic-pulse': 'mic-pulse 1.4s ease-in-out infinite',
      },
      keyframes: {
        'mic-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 45, 111, 0.6)' },
          '50%': { boxShadow: '0 0 0 14px rgba(255, 45, 111, 0)' },
        },
      },
    },
  },
  plugins: [],
}
