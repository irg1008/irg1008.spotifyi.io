const colors = require("tailwindcss/colors");

const darkColor = colors.red;
const lightColor = colors.yellow;

module.exports = {
	purge: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/templates/**/*.{js,ts,jsx,tsx}",
		"./src/providers/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		color: {
			gray: colors.trueGray,
		},
		extend: {
			colors: {
				dark: {
					DEFAULT: darkColor[400],
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
					DEFAULT: lightColor[400],
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
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
