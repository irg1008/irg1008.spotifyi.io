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
				secondary: "var(--text-primary)",
				tertiary: "var(--text-primary)",
			},
			borderColor: {
				buton: "var(--button-border-color)",
			},
			boxShadow: {
				track: "var(--custom-shadow)",
			},
			borderWidth: {
				button: "var(--button-border-width)",
			},
			colors: {
				"accent-lighter": "var(--accent-lighter)",
				"accent-light": "var(--accent-light)",
				"accent-medium": "var(--accent-medium)",
				"accent-dark": "var(--accent-dark)",
				"accent-darker": "var(--accent-darker)",
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
	plugins: [require("@tailwindcss/typography")],
};
