module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg_dark: '#161719',
        bg_light: '#f4f4f4',
        bg_navy: '#1E3A49',
        bg_preloader: '#1E3A49',
        bg_navy_dark: '#132630',
        black_rgba: 'rgba(0, 0, 0, 0.54)'
      },
      boxShadow: {
        'rightShadow': '4px 0px 14px 2px rgba(30,58,73,0.8)',
        'insetAnim': 'inset 17vw 0 0 0 black',
        'insetDefault': 'inset 0 0 0 0 black'
      },
    },
  },
  plugins: [],
}