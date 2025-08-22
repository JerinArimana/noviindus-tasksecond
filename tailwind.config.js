module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: "#5C5C5C",
        lightGray: "#1C3141",
        hashGray:"#CECECE",
      },
      fontFamily: {
        script: ["Great Vibes", "font-inter"],
      },
    },
  },
  plugins: [],
};
