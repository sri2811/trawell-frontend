/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2545",
          light: "#13315C",
          dark: "#071A33"
        },
        aqua: {
          DEFAULT: "#00C2CB",
          light: "#5EEAD4",
          dark: "#009DA5"
        }
      },
      boxShadow: {
        card: "0 4px 20px rgba(11,37,69,0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
  },
  plugins: [],
}
