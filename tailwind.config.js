/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sm: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        lg: "box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
