import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";
import {
	coolGray as darkColor,
	teal as lightColor,
	emerald as emeraldColor,
	blueGray as nordColor,
} from "tailwindcss/colors";
import { TailwindColorGroup } from "tailwindcss/tailwind-config";
import Color from "color";

// RANGE INPUT VARIABLES.
const thumb = tw`
  bg-accent-darker
  w-3
  h-3
  cursor[ew-resize]
  rounded-full
  transform
  -webkit-appearance[none]
  shadow-track
`;

const track = tw`
  h-3
  w-full
  rounded-2xl
  bg-accent-lighter
  overflow-hidden
  focus:outline-none
  -webkit-appearance[none]
  shadow-sm
`;

/*.light {
    --bg-primary: ${lightColor[300]};
    --bg-secondary: ${lightColor[100]};
    --bg-tertiary: ${lightColor[700]};

    --text-primary: ${lightColor[900]};
    --text-secondary: ${lightColor[700]};
    --text-tertiary: ${lightColor[50]};

    --button-border-width: 0;
    --button-border-color: transparent;

    --custom-radius: 1rem;
    --custom-shadow: ${`-99999px 0 0 99993px ${lightColor[400]}`};

    --accent-lighter: ${lightColor[100]};
    --accent-light: ${lightColor[300]};
    --accent-medium: ${lightColor[500]};
    --accent-dark: ${lightColor[700]};
    --accent-darker: ${lightColor[900]};
  }
  
  .dark {
    --bg-primary: ${darkColor[500]};
    --bg-secondary: ${darkColor[600]};
    --bg-tertiary: ${darkColor[700]};

    --text-primary: ${darkColor[100]};
    --text-secondary: ${darkColor[300]};
    --text-tertiary: ${darkColor[50]};

    --button-border-width: 2px;
    --button-border-color: ${darkColor[100]};
    
    --custom-radius: 9999px;
    --custom-shadow: ${`-99999px 0 0 99993px ${darkColor[400]}`};

    --accent-lighter: ${darkColor[100]};
    --accent-light: ${darkColor[300]};
    --accent-medium: ${darkColor[500]};
    --accent-dark: ${darkColor[700]};
    --accent-darker: ${darkColor[900]};
  }

  .emerald {
  }

  .nord {
  }*/

// CONVERT THEMES TO RGB.
const colorToRGB = (color: TailwindColorGroup) => {
	const hexToRGB = (hex: string) => {
		const colorRGB = Color(hex, "hex").array().join(", ");
		return colorRGB;
	};

	interface IRGBObject {
		[key: string]: string;
	}

	const RGB: IRGBObject = {};

	Object.entries(color).map((entrie) => {
		const key = entrie[0];
		const hex = entrie[1];
		RGB[key] = hexToRGB(hex);
	});

	return RGB;
};

const lightTheme = colorToRGB(lightColor);
const darkTheme = colorToRGB(darkColor);
const emeralTheme = colorToRGB(emeraldColor);
const nordTheme = colorToRGB(nordColor);

const CustomGlobalStyle = createGlobalStyle`

  .light {
    --bg-primary: ${lightTheme[300]};
    --bg-secondary: ${lightTheme[100]};
    --bg-tertiary: ${lightTheme[700]};

    --text-primary: ${lightTheme[900]};
    --text-secondary: ${lightTheme[700]};
    --text-tertiary: ${lightTheme[50]};

    --button-border-width: 0;
    --button-border-color: transparent;

    --custom-radius: 1rem;
    --custom-shadow: ${`-99999px 0 0 99993px ${lightColor[400]}`};

    --accent-lighter: ${lightTheme[100]};
    --accent-light: ${lightTheme[300]};
    --accent-medium: ${lightTheme[500]};
    --accent-dark: ${lightTheme[700]};
    --accent-darker: ${lightTheme[900]};
  }
  
  .dark {
    --bg-primary: ${darkTheme[500]};
    --bg-secondary: ${darkTheme[600]};
    --bg-tertiary: ${darkTheme[700]};

    --text-primary: ${darkTheme[100]};
    --text-secondary: ${darkTheme[300]};
    --text-tertiary: ${darkTheme[50]};

    --button-border-width: 2px;
    --button-border-color: ${darkTheme[100]};
    
    --custom-radius: 9999px;
    --custom-shadow: ${`-99999px 0 0 99993px ${darkColor[400]}`};

    --accent-lighter: ${darkTheme[100]};
    --accent-light: ${darkTheme[300]};
    --accent-medium: ${darkTheme[500]};
    --accent-dark: ${darkTheme[700]};
    --accent-darker: ${darkTheme[900]};
  }

  .emerald {
  }

  .nord {
  }

  body {
    ${tw`
      bg-opacity-100 // DEFAULT
      text-opacity-100 // DEFAULT
    `}
  }

  input[type="search"]::-webkit-search-cancel-button {
    ${tw`
      display[none]
      -webkit-appearance[none]
    `}
  }

  input[type="range"] {
    ${track}
  }

  input[type="range"]::-webkit-slider-thumb {
    ${thumb}
  }

  ol, ul {
    ${tw`
      list-disc
      list-inside
      text-left
    `}
  }

  ul{
    ${tw`
      list-disc
    `}
  }

  ol {
    ${tw`
      list-decimal
    `}
  }

  li {
    ${tw`
      ml-3
    `}
  }

  button {
    ${tw`
      outline-none
      focus:outline-none
      bg-accent-dark
      bg-opacity-80
      hover:bg-opacity-100
      duration-200
      text-white
      p-2
      shadow-lg
      transform
      transition-colors
    `}
  }

  h1 {
    ${tw`
      text-6xl
    `}
  }

  h2 {
    ${tw`
      text-4xl
    `}
  }

  h3 {
    ${tw`
      text-2xl
    `}
  }

  ::-webkit-scrollbar {
    ${tw`
      w-3.5
      bg-red-700
      rounded-full
    `}
  }
  
  ::-webkit-scrollbar-track {
    ${tw`
      background[#323739]
      bg-opacity-70
    `}
  }
  
  ::-webkit-scrollbar-thumb {
    ${tw`
      hover:bg-gray-400
      bg-gray-500
    `}
  }

  ::-webkit-scrollbar-corner {
    ${tw`
    `}
  }
`;

const GlobalStyle = () => (
	<>
		<TwinGlobalStyle />
		<CustomGlobalStyle />
	</>
);

export default GlobalStyle;
