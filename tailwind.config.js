import { heroui } from "@heroui/react";

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
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Material Design 3 Colors using CSS variables
        'primary': 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        'primary-container': 'var(--primary-container)',
        'on-primary-container': 'var(--on-primary-container)',
        
        'secondary': 'var(--secondary)',
        'on-secondary': 'var(--on-secondary)',
        'secondary-container': 'var(--secondary-container)',
        'on-secondary-container': 'var(--on-secondary-container)',
        
        'tertiary': 'var(--tertiary)',
        'on-tertiary': 'var(--on-tertiary)',
        'tertiary-container': 'var(--tertiary-container)',
        'on-tertiary-container': 'var(--on-tertiary-container)',
        
        'error': 'var(--error)',
        'on-error': 'var(--on-error)',
        'error-container': 'var(--error-container)',
        'on-error-container': 'var(--on-error-container)',
        
        'background': 'var(--background)',
        'on-background': 'var(--foreground)',
        
        'surface': 'var(--surface)',
        'on-surface': 'var(--on-surface)',
        'surface-variant': 'var(--surface-variant)',
        'on-surface-variant': 'var(--on-surface-variant)',
        'surface-container-low': 'var(--surface-container-low)',
        'surface-container': 'var(--surface-container)',
        'surface-container-high': 'var(--surface-container-high)',
        'surface-container-highest': 'var(--surface-container-highest)',
        
        'outline': 'var(--outline)',
        'outline-variant': 'var(--outline-variant)',
        
        'shadow': 'var(--shadow)',
        'scrim': 'var(--scrim)',
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFFBFE", // M3 Background
            foreground: "#1C1B1F", // M3 On Background
            primary: {
              50: "#F2E7FE",
              100: "#D9C2FD",
              200: "#BF9EFC",
              300: "#A579FB",
              400: "#8B55FA",
              500: "#6750A4", // M3 Primary
              600: "#5F4698",
              700: "#563C8C",
              800: "#4E3280",
              900: "#452874",
              DEFAULT: "#6750A4",
              foreground: "#FFFFFF", // M3 On Primary
            },
            secondary: {
              DEFAULT: "#625B71", // M3 Secondary
              foreground: "#FFFFFF", // M3 On Secondary
            },
            success: {
              DEFAULT: "#2E7D32", // Custom Success
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#EF6C00", // Custom Warning
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#B3261E", // M3 Error
              foreground: "#FFFFFF", // M3 On Error
            },
            default: {
              50: "#FDFBFF",
              100: "#F8F5FA",
              200: "#F2EFF4",
              300: "#ECE9EE",
              400: "#E6E3E8",
              500: "#E0DDE2",
              600: "#DAD7DC",
              700: "#D4D1D6",
              800: "#CECBD0",
              900: "#C8C5CA",
              DEFAULT: "#FFFBFE", // Surface
              foreground: "#1C1B1F", // On Surface
            },
            // Custom M3 Colors
            "primary-container": "#EADDFF",
            "on-primary-container": "#21005D",
            "secondary-container": "#E8DEF8",
            "on-secondary-container": "#1D192B",
            "tertiary": "#7D5260",
            "on-tertiary": "#FFFFFF",
            "tertiary-container": "#FFD8E4",
            "on-tertiary-container": "#31111D",
            "surface-variant": "#E7E0EC",
            "on-surface-variant": "#49454F",
            "outline": "#79747E",
          },
          layout: {
            disabledOpacity: "0.38",
            radius: {
              small: "8px",
              medium: "12px",
              large: "16px",
              xl: "28px", // M3 Extra Large
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
            background: "#1C1B1F", // M3 Dark Background
            foreground: "#E6E1E5", // M3 Dark On Background
            primary: {
              50: "#21005D",
              100: "#381E72",
              200: "#4F378B",
              300: "#6750A4",
              400: "#7F67BE",
              500: "#9A82DB",
              600: "#B69DF8",
              700: "#D0BCFF", // M3 Dark Primary
              800: "#EADDFF",
              900: "#F6EDFF",
              DEFAULT: "#D0BCFF",
              foreground: "#381E72", // M3 Dark On Primary
            },
            secondary: {
              DEFAULT: "#CCC2DC", // M3 Dark Secondary
              foreground: "#332D41", // M3 Dark On Secondary
            },
            success: {
              DEFAULT: "#B7F397", // Custom Dark Success
              foreground: "#003909",
            },
            warning: {
              DEFAULT: "#FFB74D", // Custom Dark Warning
              foreground: "#4E2600",
            },
            danger: {
              DEFAULT: "#F2B8B5", // M3 Dark Error
              foreground: "#601410", // M3 Dark On Error
            },
            default: {
              50: "#1C1B1F",
              100: "#25232A",
              200: "#312E36",
              300: "#3C3941",
              400: "#48444D",
              500: "#544F59",
              600: "#605B65",
              700: "#6D6771",
              800: "#79737E",
              900: "#867F8A",
              DEFAULT: "#1C1B1F", // Surface
              foreground: "#E6E1E5", // On Surface
            },
            // Custom M3 Dark Colors
            "primary-container": "#4F378B",
            "on-primary-container": "#EADDFF",
            "secondary-container": "#4A4458",
            "on-secondary-container": "#E8DEF8",
            "tertiary": "#EFB8C8",
            "on-tertiary": "#492532",
            "tertiary-container": "#633B48",
            "on-tertiary-container": "#FFD8E4",
            "surface-variant": "#49454F",
            "on-surface-variant": "#CAC4D0",
            "outline": "#938F99",
          },
        },
      },
    }),
  ],
};