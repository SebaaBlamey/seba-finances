const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FBFBFD",
            foreground: "#000000",
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#007AFF",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#007AFF",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#5856D6",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#34C759",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#FF9500",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#FF3B30",
              foreground: "#FFFFFF",
            },
            default: {
              50: "#fafafa",
              100: "#f4f4f5",
              200: "#e4e4e7",
              300: "#d4d4d8",
              400: "#a1a1aa",
              500: "#71717a",
              600: "#52525b",
              700: "#3f3f46",
              800: "#27272a",
              900: "#18181b",
              DEFAULT: "#FFFFFF",
              foreground: "#000000",
            },
          },
          layout: {
            disabledOpacity: "0.5",
            radius: {
              small: "8px",
              medium: "12px", 
              large: "16px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#FFFFFF",
            primary: {
              50: "#001731",
              100: "#002e62",
              200: "#004493",
              300: "#005bc4",
              400: "#0A84FF",
              500: "#338ef7",
              600: "#66aaf9",
              700: "#99c7fb",
              800: "#cce3fd",
              900: "#e6f1fe",
              DEFAULT: "#0A84FF",
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#5856D6",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#30D158",
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#FF9F0A",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#FF453A",
              foreground: "#FFFFFF",
            },
            default: {
              50: "#18181b",
              100: "#27272a",
              200: "#3f3f46",
              300: "#52525b",
              400: "#71717a",
              500: "#a1a1aa",
              600: "#d4d4d8",
              700: "#e4e4e7",
              800: "#f4f4f5",
              900: "#fafafa",
              DEFAULT: "#1C1C1E",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};