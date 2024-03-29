import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1332px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "var(--input)",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
          "foreground-hover": "var(--primary-foreground-hover)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        "gov-br": {
          DEFAULT: "rgb(var(--gov-br))",
          hover: "rgb(var(--gov-br-hover))",
          foreground: "rgb(var(--gov-br-foreground))"
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "var(--muted-foreground)",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      backgroundImage: {
        "welcome": "url('/bg-welcome.png'), linear-gradient(90deg, #36771C 25.1%, rgba(217, 217, 217, 0.00) 99.25%)"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
