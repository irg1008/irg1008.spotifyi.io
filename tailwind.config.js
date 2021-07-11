const colors = require("tailwindcss/colors");
const {
	coolGray: darkColor,
	teal: lightColor,
	emerald: emeraldColor,
	blueGray: nordColor,
} = require("tailwindcss/colors");

module.exports = {
	darkMode: "class",
	theme: {
		extend: {
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
			borderColor: {
				buton: "var(--button-border-color)",
			},
			colors: {
				"accent-lighter": "var(--accent-lighter)",
				"accent-light": "var(--accent-light)",
				"accent-medium": "var(--accent-medium)",
				"accent-dark": "var(--accent-dark)",
				"accent-darker": "var(--accent-darker)",
			},
			borderRadius: {
				custom: "var(--custom-radius)",
			},
			boxShadow: {
				track: "var(--custom-shadow)",
			},
			borderWidth: {
				button: "var(--button-border-width)",
			},
			variables: {
				DEFAULT: {
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
					borderColor: {
						buton: "transparent",
					},
					colors: {
						"accent-lighter": lightColor[100],
						"accent-light": lightColor[300],
						"accent-medium": lightColor[500],
						"accent-dark": lightColor[700],
						"accent-darker": lightColor[900],
					},
					borderRadius: {
						custom: "1rem",
					},
					boxShadow: {
						track: `-99999px 0 0 99993px ${lightColor[400]}`,
					},
					borderWidth: {
						button: 0,
					},
				},
			},
			darkVariables: {
				DEFAULT: {
					backgroundColor: {
						primary: lightColor[500],
						secondary: lightColor[600],
						tertiary: lightColor[700],
					},
					textColor: {
						primary: lightColor[100],
						secondary: lightColor[300],
						tertiary: lightColor[50],
					},
					borderColor: {
						buton: darkColor[100],
					},
					borderRadius: {
						custom: "9999px",
					},
					boxShadow: {
						track: `-99999px 0 0 99993px ${darkColor[400]}`,
					},
					borderWidth: {
						button: "2px",
					},
				},
			},
		},
	},
	variants: {},
	plugins: [],
};
