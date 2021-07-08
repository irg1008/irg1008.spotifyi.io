import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";

const thumb = tw`
  dark:bg-dark-800
  light:bg-light-800
  w-3
  h-3
  cursor[ew-resize]
  rounded-full
  transform
  -webkit-appearance[none]
  light:shadow-track-light
  dark:shadow-track-dark
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
      dark:bg-dark-500
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
