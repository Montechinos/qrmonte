/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: "#0F0F0F",
        card: "#1A1A1A",
        border: "#2A2A2A",
        accent: "#E8FF3B",       // amarillo neón minimalista
        muted: "#6B6B6B",
        success: "#3BFF8A",
        danger: "#FF3B3B",
      },
    },
  },
  plugins: [],
};
