const { tailwindTheme } = require("./src/styles/theme/theme.config");

module.exports = {
	// mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			...tailwindTheme,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
