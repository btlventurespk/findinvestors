import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1B2B',
        green: { DEFAULT: '#16C172', deep: '#0E9C58' },
        paper: '#F7F7F5',
        slate: '#94A3B0',
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        h1: ['56px', { lineHeight: '1.05', fontWeight: '800' }],
        h2: ['36px', { lineHeight: '1.15', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.25', fontWeight: '700' }],
        body: ['17px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.5' }],
        label: ['12px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
    },
  },
  plugins: [],
};

export default config;
