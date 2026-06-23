import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Identité Atlas Leather
        cream: {
          DEFAULT: "#F7F3EC",
          50: "#FDFCFA",
          100: "#F7F3EC",
          200: "#EDE6D8",
          300: "#E3D9C6",
        },
        sand: {
          DEFAULT: "#D9C9AC",
          100: "#E8DCC4",
          200: "#D9C9AC",
          300: "#C8B595",
          400: "#B8A07C",
        },
        leather: {
          DEFAULT: "#8B6F4E",
          50: "#A8896A",
          100: "#8B6F4E",
          200: "#6B5439",
          300: "#5A4530",
          400: "#4A3826",
          500: "#3B2A1E",
        },
        ink: {
          DEFAULT: "#1C1A16",
          light: "#4A4136",
          muted: "#8B7E6A",
        },
        gold: {
          DEFAULT: "#C9A455",
          light: "#D4AF6A",
          dark: "#A6822E",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1C1A16",
          foreground: "#F7F3EC",
        },
        secondary: {
          DEFAULT: "#EDE6D8",
          foreground: "#1C1A16",
        },
        muted: {
          DEFAULT: "#F1ECE2",
          foreground: "#8B7E6A",
        },
        accent: {
          DEFAULT: "#C9A455",
          foreground: "#1C1A16",
        },
        destructive: {
          DEFAULT: "#A3403A",
          foreground: "#F7F3EC",
        },
        input: "hsl(var(--border))",
        ring: "#C9A455",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["2rem", { lineHeight: "1.2" }],
        "overline": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.2em" }],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.3em",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "6px",
      },
      maxWidth: {
        "8xl": "1440px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        fadeInUp: "fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideInRight: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s infinite linear",
        marquee: "marquee 30s linear infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("tailwindcss-animate"),
  ],
};

export default config;
