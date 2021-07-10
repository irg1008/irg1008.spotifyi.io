import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";
import {
	coolGray as darkColor,
	teal as lightColor,
	emerald,
	blueGray as nord,
} from "tailwindcss/colors";
import theme from "tailwindcss/defaultTheme";

const thumb = tw`
  dark:bg-dark-800
  light:bg-light-800
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
  dark:bg-dark-100
  light:bg-light-100
  overflow-hidden
  focus:outline-none
  -webkit-appearance[none]
  shadow-sm
`;

const CustomGlobalStyle = createGlobalStyle`
  .light {
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
    --accent-medium: ${lightColor[600]};
    --accent-dark: ${lightColor[800]};
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
    --accent-medium: ${darkColor[600]};
    --accent-dark: ${darkColor[900]};
  }

  .emerald {
    --bg-primary: ${emerald[500]};
    --bg-secondary: ${emerald[600]};
    --bg-tertiary: ${emerald[700]};
    --text-primary: ${emerald[600]};
    --text-primary: ${emerald[100]};
    --text-tertiary: ${emerald[50]};
    --custom-radius: 9999px;
    --custom-shadow: ${`-99999px 0 0 99993px ${emerald[400]}`};
  }

  .nord {

  }

  body {
    ${tw`
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
      light:bg-light-700
      dark:bg-dark-700
      bg-opacity-50
      hover:bg-opacity-80
      duration-200
      dark:text-white
      light:text-white
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
