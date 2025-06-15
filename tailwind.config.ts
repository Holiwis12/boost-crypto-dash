
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
			colors: {
        primary: {
          DEFAULT: '#1F1F2E',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#0DCAF0',
          foreground: '#1F1F2E'
        },
        success: {
          DEFAULT: '#28A745'
        },
        warning: {
          DEFAULT: '#FFC107'
        },
        background: '#F8F9FA',
        text: {
          DEFAULT: '#333333',
        },
        card: '#29293A',
			},
      borderRadius: {
        lg: '1rem', // mayor suavidad para tarjetas
        md: '0.5rem',
        sm: '0.25rem'
      },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
