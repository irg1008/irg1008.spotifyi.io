const themeSwapper = require("tailwindcss-theme-swapper");
const {
	coolGray: darkColor,
	teal: lightColor,
	emerald: emeraldColor,
	blueGray: nordColor,
} = require("tailwindcss/colors");

const themeConfig = {
	themes: [
		{
			name: "base",
			selectors: [":root"],
			theme: {
				backgroundColor: {
					primary: lightColor[300],
					secondary: lightColor[100],
					tertiary: lightColor[700],
				},
				textColor: {
					primary: lightColor[900],
					secondary: lightColor[700],
					tertiary: lightColor[50],
				},
				colors: {
					"accent-lighter": lightColor[100],
					"accent-light": lightColor[300],
					"accent-medium": lightColor[500],
					"accent-dark": lightColor[700],
					"accent-darker": lightColor[900],
				},
				borderColor: {
					button: "transparent",
				},
				borderWidth: {
					button: 0,
				},
				borderRadius: {
					custom: "1rem",
				},
				boxShadow: {
					track: `-99999px 0 0 99993px ${lightColor[400]}`,
				},
			},
		},
		{
			name: "dark",
			selectors: [".dark"],
			theme: {
				backgroundColors: {
					primary: lightColor[300],
					secondary: lightColor[100],
					tertiary: lightColor[700],
				},
				textColors: {
					primary: lightColor[900],
					secondary: lightColor[700],
					tertiary: lightColor[50],
				},
				colors: {
					"accent-lighter": lightColor[100],
					"accent-light": lightColor[300],
					"accent-medium": lightColor[500],
					"accent-dark": lightColor[700],
					"accent-darker": lightColor[900],
				},
				borderColor: {
					button: darkColor[100],
				},
				borderWidth: {
					button: "2px",
				},
				borderRadius: {
					custom: "9999px",
				},
				boxShadow: {
					track: `-99999px 0 0 99993px ${lightColor[400]}`,
				},
			},
		},
	],
};

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: { extend: {} },
	plugins: [themeSwapper(themeConfig)],
};
