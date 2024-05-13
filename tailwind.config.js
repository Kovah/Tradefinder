const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
        gray: {
          '50': '#fff',
          '100': '#f8f9fa',
          '200': '#e9ecef',
          '300': '#dee2e6',
          '400': '#ced4da',
          '500': '#adb5bd',
          '600': '#6c757d',
          '700': '#495057',
          '800': '#343a40',
          '850': '#282e33',
          '900': '#212529',
          '950': '#121417',
        }
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', 'sans-serif'],
      },
      fontSize: {
        'xxs': '.65rem'
      }
    }
  },
  variants: {},
  plugins: [],
}
