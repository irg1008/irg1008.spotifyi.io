import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";

const thumb = tw`
  dark:bg-red-800
  light:bg-green-800
  transform
  hover:scale-110
  transition-transform
  duration-100
  ease-in-out
  w-3
  h-3
  cursor[ew-resize]
  rounded-full
  -webkit-appearance[none]
  dark:box-shadow[-99999px 0 0 99993px lightcoral]
  light:box-shadow[-99999px 0 0 99993px rgba(54, 224, 156, 0.6)]
`;

const track = tw`
  mx-3
  h-3
  w-full
  rounded-2xl
  dark:bg-red-100
  light:bg-green-100
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
      light:bg-green-200
      dark:bg-red-500
      bg-opacity-50
      hover:bg-opacity-80
      duration-200
      dark:text-white
      light:text-black
      dark:border-white
      light:border-black
      p-2
      shadow-lg
      transform
      transition-colors
    `}
  }

  h1, h2, h3, h4, h5, h6, p, li {
    ${tw`
      text-white
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
