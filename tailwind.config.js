const { blueGray: darkColor, teal: lightColor } = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");

module.exports = {
	// mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			borderRadius: {
				custom: "var(--custom-radius)",
			},
			backgroundColor: {
				primary: "var(--bg-primary)",
				secondary: "var(--bg-secondary)",
				tertiary: "var(--bg-tertiary)",
			},
			textColor: {
				primary: "var(--text-primary)",
				secondary: "var(--text-secondary)",
				tertiary: "var(--text-tertiary)",
			},
			boxShadow: {
				track: "var(--custom-shadow)",
			},
			borderColor: {
				button: "var(--button-border-color)",
			},
			borderWidth: {
				button: "var(--button-border-width)",
			},
			colors: {
				"small-dark": "var(--small-dark)",
				"medium-dark": "var(--medium-dark)",
				"large-dark": "var(--large-dark)",
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
	plugins: [typography],
};
