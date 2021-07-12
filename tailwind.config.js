const colorFn = (varName, { opacityVariable, opacityValue }) => {
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
};


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
				primary: (data) => colorFn("bg-primary", data),
				secondary: (data) => colorFn("bg-secondary", data),
				tertiary: (data) => colorFn("bg-tertiary", data),
			},
			textColor: {
				primary: (data) => colorFn("text-primary", data),
				secondary: (data) => colorFn("text-primary", data),
				tertiary: (data) => colorFn("text-primary", data),
			},
			colors: {
				"accent-lighter": (data) => colorFn("accent-lighter", data),
				"accent-light": (data) => colorFn("accent-light", data),
				"accent-medium": (data) => colorFn("accent-medium", data),
				"accent-dark": (data) => colorFn("accent-dark", data),
				"accent-darker": (data) => colorFn("accent-darker", data),
			},
			borderColor: {
				buton: (data) => colorFn("button-border-color", data),
			},
			boxShadow: {
				track: "var(--custom-shadow)",
			},
			borderWidth: {
				button: "var(--button-border-width)",
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
