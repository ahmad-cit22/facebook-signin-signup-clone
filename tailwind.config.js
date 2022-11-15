/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "#1C1E21",
      },
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
      keyframes: {
        popUp: {
          "0%": { opacity: "0", transform: "scale(10%)" },
          "70%": { opacity: ".9", transform: "scale(110%)" },
          "100%": { opacity: "1", transform: "scale(100%)" },
        },
        popUpY: {
          "0%": { opacity: "0", transform: "scaleY(10%)" },
          "100%": { opacity: "1", transform: "scaleY(100%)" },
        },
        popDown: {
          "0%": { opacity: "0", transform: "scaleX(170%)" },
          "100%": { opacity: "1", transform: "scaleX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
