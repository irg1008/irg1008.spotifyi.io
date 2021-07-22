import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";
import { cssThemes } from "theme";

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
  border
  border-accent-light
`;

const customButton = tw`
  box-shadow[
    3px 3px 5px rgba(0, 0, 0, 0.4),
    -3px -3px 5px rgba(255, 255, 255, 0.4)]
  hover:(
    animate-pulse
  )
  active:(
    scale-95
  )
  disabled:(
    pointer-events-none
    bg-accent-light
    text-accent-medium
    box-shadow[
      inset 3px 3px 8px rgba(0, 0, 0, 0.4),
      inset -3px -3px 8px rgba(255, 255, 255, 0.4)]
  )
  focus:outline-none
  transform
  bg-accent-dark
  duration-200
  text-accent-lighter
  p-2
  transition-all
  outline-none
  rounded-lg
  border
  border-color[rgba(255, 255, 255, 0.2)]
  box-sizing[border-box]
`;

const CustomGlobalStyle = createGlobalStyle`
  ${cssThemes};

  body {
    ${tw`
      // DEFAULT
      bg-opacity-100
      text-opacity-100
      border-opacity-100
      transition-colors
      duration-300
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
    ${customButton}
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
