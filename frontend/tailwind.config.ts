const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import fluid, { extract, screens, fontSize } from "fluid-tailwind";

const plugin = require("tailwindcss/plugin");

import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: {
		files: [
			"./src/pages/**/*.{ts,tsx}",
			"./src/components/**/*.{ts,tsx}",
			"./src/app/**/*.{ts,tsx}",
			"./src/**/*.{ts,tsx}",
		],
		extract,
	},
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				xs: "20rem",
			},
			dropShadow: {
				"3xl": "0 35px 35px rgba(255, 255, 255, 0.15)",
				"4xl": [
					"0 35px 35px rgba(255, 255, 255, 0.25)",
					"0 45px 65px rgba(255, 255, 255, 0.15)",
				],
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
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
				"color-1": "hsl(var(--color-1))",
				"color-2": "hsl(var(--color-2))",
				"color-3": "hsl(var(--color-3))",
				"color-4": "hsl(var(--color-4))",
				"color-5": "hsl(var(--color-5))",
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: "0 0",
					},
					to: {
						backgroundPosition: "-200% 0",
					},
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				rainbow: {
					"0%": {
						"background-position": "0%",
					},
					"100%": {
						"background-position": "200%",
					},
				},
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
				spotlight: {
					"0%": {
						opacity: "0",
						transform: "translate(-72%, -62%) scale(0.5)",
					},
					"100%": {
						opacity: "1",
						transform: "translate(-50%,-40%) scale(1)",
					},
				},
			},
			animation: {
				spotlight: "spotlight 2s ease .75s 1 forwards",
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
				shimmer: "shimmer 2s linear infinite",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				rainbow: "rainbow var(--speed, 2s) infinite linear",
			},
		},
	},
	plugins: [
		addVariablesForColors,
		plugin(function ({ addVariant }: any) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		}),
		fluid,
	],
} satisfies Config;

export default config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	);

	addBase({
		":root": newVars,
	});
}
