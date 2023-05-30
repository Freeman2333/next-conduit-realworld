/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        conduit: {
          gray: {
            100: '#f3f3f3',
            150: '#f5f5f5',
            200: '#eceeef',
            250: '#e5e5e5',
            300: '#ddd',
            400: '#ccc',
            500: '#bbb',
            600: '#aaa',
            650: '#a1a1a1',
            700: '#999',
            800: '#818a91',
            900: '#687077',
            1000: '#373a3c',
            1100: '#333',
          },
          green: '#5CB85C',
          darkGreen: '#3d8b3d',
          red: '#B85C5C',
        },
      },
    },
  },
  plugins: [],
};
