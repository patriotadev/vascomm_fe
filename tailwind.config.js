/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#41A0E4',
        success: '#479F77',
        danger: '#D83A56',
        warning: '#EC9024',
        modalBg: 'rgba(0,0,0,0.5)'
      },
      fontFamily: {
        playfair: ["var(--playfair-font)", "ui-sans-serif"],
        poppins: ["var(--poppins-font)", "ui-sans-serif"],
      }
    },
  },
  plugins: [],
}
