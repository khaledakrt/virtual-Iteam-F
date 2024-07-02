// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-500': '#0C0526', // Replace with your desired color code
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-down': 'fadeInDown 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
