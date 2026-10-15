import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: "#0D0907",
          900: "#17110E",
          850: "#211814",
          800: "#2B1B16",
          700: "#3D271F",
          600: "#54372C",
        },
        mocha: {
          DEFAULT: "#6F4E37",
          light: "#825D43",
          dark: "#5A3E2B",
        },
        caramel: {
          DEFAULT: "#C58B55",
          light: "#D49D69",
          dark: "#A6713E",
        },
        gold: {
          soft: "#D9B47C",
          warm: "#E3A857",
          pale: "#EED7A1",
        },
        cream: {
          DEFAULT: "#F5EBDD",
          soft: "#FFF9F0",
          latte: "#ECE3D6",
          muted: "#E0D2C0",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-display)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "coffee-ambient": "radial-gradient(circle at 50% 30%, rgba(197, 139, 85, 0.15), rgba(43, 27, 22, 0.4) 60%, rgba(23, 17, 14, 0.95) 100%)",
        "gold-glow": "radial-gradient(circle at center, rgba(217, 180, 124, 0.25) 0%, rgba(217, 180, 124, 0.05) 50%, transparent 75%)",
      },
      animation: {
        "steam-slow": "steam 6s ease-in-out infinite",
        "steam-mid": "steam 4.5s ease-in-out infinite",
        "float-gentle": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        steam: {
          "0%": { transform: "translateY(0) scaleX(1) scaleY(1)", opacity: "0" },
          "15%": { opacity: "0.5" },
          "50%": { transform: "translateY(-40px) scaleX(1.4) scaleY(1.3)", opacity: "0.35" },
          "85%": { opacity: "0.1" },
          "100%": { transform: "translateY(-90px) scaleX(1.8) scaleY(1.6)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
