const { blueGray: darkColor, teal: lightColor } = require("tailwindcss/colors");
const colorVariable = require("@mertasan/tailwindcss-variables/colorVariable");

/*const colorFn = (varName, { opacityVariable, opacityValue }) => {
	if (opacityValue !== undefined)
		return `rgba(var(--${varName}), ${opacityValue})`;

	if (opacityVariable !== undefined)
		return `rgba(var(--${varName}), var(${opacityVariable}, 1))`;

	return `rgb(var(--${varName}))`;
};

const customColors = (varNames, classNames) => {
	const varWithOpacity = {};

	varNames.map((varName, i) => {
		const className = !!classNames ? classNames[i] : varName;
		varWithOpacity[className] = ({ opacityVariable, opacityValue }) =>
			addOpacity(varName, opacityVariable, opacityValue);
	});

	return varWithOpacity;
};*/

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
	plugins: [
		require("@tailwindcss/typography"),
		require("@mertasan/tailwindcss-variables")({
			colorVariables: true,
		}),
	],
};
