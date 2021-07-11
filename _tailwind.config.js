const colorVariable = require("@mertasan/tailwindcss-variables/colorVariable");

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
				primary: colorVariable("var(--bg-primary)"),
				secondary: colorVariable("var(--bg-secondary)"),
				tertiary: colorVariable("var(--bg-tertiary)"),
			},
			textColor: {
				primary: colorVariable("var(--text-primary)"),
				secondary: colorVariable("var(--text-primary)"),
				tertiary: colorVariable("var(--text-primary)"),
			},
			borderColor: {
				buton: colorVariable("var(--button-border-color)"),
			},
			boxShadow: {
				track: "var(--custom-shadow)",
			},
			borderWidth: {
				button: "var(--button-border-width)",
			},
			colors: {
				"accent-lighter": colorVariable("var(--accent-lighter)"),
				"accent-light": colorVariable("var(--accent-light)"),
				"accent-medium": colorVariable("var(--accent-medium)"),
				"accent-dark": colorVariable("var(--accent-dark)"),
				"accent-darker": colorVariable("var(--accent-darker)"),
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
		require("@mertasan/tailwindcss-variables")({
			colorVariables: true,
		}),
	],
};
