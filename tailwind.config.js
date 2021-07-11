const colorVariable = require("@mertasan/tailwindcss-variables/colorVariable");
const {
	coolGray: darkColor,
	teal: lightColor,
	emerald: emeraldColor,
	blueGray: nordColor,
} = require("tailwindcss/colors");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "media",
	theme: {
		extend: {
			backgroundColor: {
				primary: colorVariable("--bg-primary", true),
				secondary: colorVariable("--bg-secondary", true),
				tertiary: colorVariable("--bg-tertiary", true),
			},
			textColor: {
				primary: colorVariable("--text-primary", true),
				secondary: colorVariable("--text-secondary", true),
				tertiary: colorVariable("--text-tertiary", true),
			},
			colors: {
				"accent-lighter": colorVariable("var(--accent-lighter)", true),
				"accent-light": colorVariable("var(--accent-light)", true),
				"accent-medium": colorVariable("var(--accent-medium)", true),
				"accent-dark": colorVariable("var(--accent-dark)", true),
				"accent-darker": colorVariable("var(--accent-darker)", true),
			},
			borderColor: {
				button: colorVariable("var(--button-border-color)"),
			},
			borderWidth: {
				button: "var(--button-border-width)",
			},
			borderRadius: {
				custom: "var(--custom-radius)",
			},
			boxShadow: {
				track: "var(--custom-shadow)",
			},
		},
		variables: {
			DEFAULT: {
				bg: {
					primary: lightColor[300],
					secondary: lightColor[100],
					tertiary: lightColor[700],
				},
				text: {
					primary: lightColor[900],
					secondary: lightColor[700],
					tertiary: lightColor[50],
				},
				accent: {
					lighter: lightColor[100],
					light: lightColor[300],
					medium: lightColor[500],
					dark: lightColor[700],
					darker: lightColor[900],
				},
				button: {
					border: {
						color: "transparent",
						width: 0,
					},
				},
				custom: {
					radius: "1rem",
					shadow: `-99999px 0 0 99993px ${lightColor[400]}`,
				},
			},
		},
		darkVariables: {
			DEFAULT: {
				bg: {
					primary: darkColor[500],
					secondary: darkColor[600],
					tertiary: darkColor[700],
				},
				text: {
					primary: darkColor[100],
					secondary: darkColor[300],
					tertiary: darkColor[50],
				},
				accent: {
					lighter: darkColor[100],
					light: darkColor[300],
					medium: darkColor[500],
					dark: darkColor[700],
					darker: darkColor[900],
				},
				button_border: {
					color: darkColor[100],
					width: "2px",
				},
				custom: {
					radius: "9999px",
					shadow: `-99999px 0 0 99993px ${darkColor[400]}`,
				},
			},
		},
	},
	plugins: [
		require("@mertasan/tailwindcss-variables")({
			colorVariables: true,
			forceRGB: true,
			darkToRoot: false,
			darkSelector: ".theme-dark",
		}),
	],
};
