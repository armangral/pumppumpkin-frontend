/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-blue)",
        grey: "var(--primary-grey)",
        light_grey: "var(--light-grey)",
        whitish: "var(--whitish)",
        dark_grey: "var( --dark-grey)",
        dark_blue: "var( --dark-blue)",
        blackish: "var(--blackish)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
