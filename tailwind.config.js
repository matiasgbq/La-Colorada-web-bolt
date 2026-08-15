/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        crimson: {
          50: '#fdecec',
          100: '#fbd5d5',
          200: '#f6adad',
          300: '#ef7a7a',
          400: '#e64d4d',
          500: '#D32F2F',
          600: '#b71c1c',
          700: '#9a1414',
          800: '#7d1010',
          900: '#660c0c',
        },
        cream: {
          50: '#fffdf7',
          100: '#fdf8ec',
          200: '#f9f0d4',
          300: '#f3e4b0',
        },
        ink: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#bdbdbd',
          300: '#9e9e9e',
          400: '#6e6e6e',
          500: '#424242',
          600: '#333333',
          700: '#262626',
          800: '#1A1A1A',
          900: '#0d0d0d',
        },
      },
      backgroundImage: {
        checker:
          'repeating-conic-gradient(#D32F2F 0% 25%, #f9f0d4 0% 50%)',
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)', opacity: '0.4' },
          '50%': { transform: 'translateY(-14px) scaleY(1.2)', opacity: '0.85' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg) scale(1)' },
          '50%': { transform: 'rotate(4deg) scale(1.04)' },
        },
      },
      animation: {
        floatUp: 'floatUp 0.7s ease-out both',
        steam: 'steam 3s ease-in-out infinite',
        slideIn: 'slideIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        fadeIn: 'fadeIn 0.25s ease-out both',
        pop: 'pop 0.3s cubic-bezier(0.16,1,0.3,1) both',
        wiggle: 'wiggle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
