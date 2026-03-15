import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C84B2F',
          dark: '#8B3420',
          light: '#F5D5CC',
        },
        green: {
          brand: '#3A6B2A',
          light: '#D4E8CC',
        },
        amber: {
          brand: '#D4890A',
          light: '#FAE4B0',
        },
        cream: '#FAF4EC',
        ink: '#1C1508',
        muted: '#6B5B4A',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        brand: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
