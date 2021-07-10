const {
	blueGray: darkColor,
	teal: lightColor,
	emerald,
	fuchsia,
} = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");
const themeSwapper = require("tailwindcss-theme-swapper");

const baseTheme = {
	colors: {
		primary: "#384cff",
		"primary-active": "#0014c7",
		surface: "#ddd",
		base: "#eee",
		dark: "#222",
	},
	spacing: {
		small: "4px",
		medium: "8px",
		large: "16px",
	},
	borderRadius: {
		default: "5px",
	},
};

const darkTheme = {
	colors: {
		primary: "#e320b6",
		"primary-active": "#ff00c4",
		surface: "#111",
		base: "#000",
		dark: "#ccc",
	},
};

const geocitiesTheme = {
	colors: {
		primary: "#7f9e0e",
		"primary-active": "#70a300",
		surface: "#2f4d2f",
		base: "#243b24",
		dark: "#66a663",
	},
};

const spacierTheme = {
	spacing: {
		small: "8px",
		medium: "16px",
		large: "32px",
	},
};

const squarierTheme = {
	borderRadius: {
		default: "0",
	},
};

const themeSwapperConfig = {
	themes: [
		{ name: "base", selectors: [":root"], theme: baseTheme },
		{ name: "dark", selectors: [".dark"], theme: darkTheme },
		{ name: "geocities", selectors: [".geocities"], theme: geocitiesTheme },
		{ name: "spacier", selectors: [".spacier"], theme: spacierTheme },
		{ name: "squarier", selectors: [".squarier"], theme: squarierTheme },
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
	plugins: [typography, themeSwapper(themeSwapperConfig)],
};
