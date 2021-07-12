// Interfaces for TypeScript:
/*
interface IOpacityData {
  opacityVariable: string;
  opacityValue: number;
}

type TTailwindColorFn = (data: IOpacityData) => string;

interface IVarWithOpacity {
  [className: string]: TTailwindColorFn;
}*/

/**
 * PARSES CSS VARIABLES TO BG-OPACITY CAPACITY TAILWIND CLASSES.
 *
 * @param {string} cssVarName
 * @param {IOpacityData} { opacityVariable, opacityValue }
 * @return {*}  {string}
 */
const colorFn = (cssVarName, { opacityVariable, opacityValue }) => {
	if (opacityValue !== undefined)
		return `rgba(var(--${cssVarName}), ${opacityValue})`;
	if (opacityVariable !== undefined)
		return `rgba(var(--${cssVarName}), var(${opacityVariable}, 1))`;
	return `rgb(var(--${cssVarName}))`;
};

/**
 * Given two arrays of CSS variables names and respective
 * tailwind class name, adds the opacity capacity calling colorFn.
 *
 * @param {string[]} cssVarName
 * @param {string[]} [twVarNames]
 * @return {*}  {IVarWithOpacity}
 */
const customColors = (cssVarName, twVarNames) => {
	const varWithOpacity = {};
	cssVarName.map((cssVarName, i) => {
		const className = !!twVarNames ? twVarNames[i] : cssVarName;
		varWithOpacity[className] = (data) => colorFn(cssVarName, data);
	});
	return varWithOpacity;
};

/**
 * THEME VARIABLES. ADDED TO TAILWIND CONFIG EXTEND THEME.
 * THESE ARE USED TO MAP THE DIFFERENT THEMES (SEE BELOW)
 */
const backgroundColor = customColors(
	["bg-primary", "bg-secondary", "bg-tertiary"],
	["primary", "secondary", "tertiary"],
);

const textColor = customColors(
	["text-primary", "text-secondary", "text-tertiary"],
	["primary", "secondary", "tertiary"],
);

const colors = customColors([
	"accent-lighter",
	"accent-light",
	"accent-medium",
	"accent-dark",
	"accent-darker",
]);

const borderColor = customColors(["custom-radius", "custom"]);
const borderRadius = { custom: "var(--custom-radius)" };

const borderWidth = { button: "var(--button-border-width)" };
const boxShadow = { track: "var(--custom-shadow)" };

const tailwindTheme = {
	backgroundColor,
	textColor,
	colors,
	borderColor,
	borderRadius,
	borderWidth,
	boxShadow,
};

// EXPORT OF TAILWIND THEME.
module.exports = {
	tailwindTheme,
};
