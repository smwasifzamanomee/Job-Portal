import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1284px",
        },
      },
      colors: {
        primary: "#232323",
        secondary: "#9CFF5E",
        bg_color: "#F5F6FB;",
      },
      screens: {
        sm: { min: "320px", max: "600px" },
        md: { min: "601px", max: "820px" },
        lg: { min: "821px" },
        xl: { min: "1200px" },
      },
    },
    fontFamily: {
      bebas: ["Bebas Neue", "sans-serif"],
      urbanist: ["Urbanist", "sans-serif"],
      dmsans: ["DM Sans", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
