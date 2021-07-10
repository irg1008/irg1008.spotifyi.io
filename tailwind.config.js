const themeSwapper = require("tailwindcss-theme-swapper");
const {
	blueGray: darkColor,
	teal: lightColor,
	emerald,
	fuchsia,
} = require("tailwindcss/colors");

const themeSwapperConfig = {
	themes: [
		{
			name: "light",
			selector: [":root"],
			theme: {
				colors: {
					primary: lightColor[100],
				},
			},
		},
		{
			name: "dark",
			selectors: [".dark", "[dark]", '[data-theme="dark"]'],
			theme: {
				colors: {
					primary: darkColor[100],
				},
			},
		},
		{
			name: "emerald",
			selector: [".emerald"],
			theme: {
				colors: {
					primary: emerald[100],
				},
			},
		},
		{
			name: "high-contrast",
			theme: {
				colors: {
					primary: "#ddd",
				},
			},
		},
	],
};

module.exports = {
	// mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dark: {
					50: darkColor[50],
					100: darkColor[100],
					200: darkColor[200],
					300: darkColor[300],
					400: darkColor[400],
					500: darkColor[500],
					600: darkColor[600],
					700: darkColor[700],
					800: darkColor[800],
					900: darkColor[900],
				},
				light: {
					50: lightColor[50],
					100: lightColor[100],
					200: lightColor[200],
					300: lightColor[300],
					400: lightColor[400],
					500: lightColor[500],
					600: lightColor[600],
					700: lightColor[700],
					800: lightColor[800],
					900: lightColor[900],
				},
				emerald,
				fuchsia,
				gold: {
					light: "#ddbf5f",
					base: "#d4af37",
					dark: "#aa8c2c",
				},
			},
			boxShadow: {
				"track-light": `-99999px 0 0 99993px ${lightColor[400]}`,
				"track-dark": `-99999px 0 0 99993px ${darkColor[400]}`,
			},
		},
	},
	variants: {
		extend: {
			borderColor: ["group-focus"],
			backgroundColor: ["group-focus"],
			textColor: ["group-focus"],
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		themeSwapper(themeSwapperConfig),
	],
};
