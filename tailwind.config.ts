import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Metropolis', 'Barlow', 'sans-serif'],
      },
      colors: {
        black: '#0a0a09',
        'off-white': '#f5f5f3',
        'gray-100': '#e8e8e6',
        'gray-200': '#d1d1ce',
        'gray-400': '#9a9a96',
        'gray-600': '#5c5c59',
        'gray-800': '#2a2a28',
      },
    },
  },
  plugins: [],
};

export default config;
