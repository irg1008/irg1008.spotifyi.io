import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TwinGlobalStyle } from "twin.macro";

const CustomGlobalStyle = createGlobalStyle`
  input[type="search"]::-webkit-search-cancel-button {
    ${tw`
      display[none]
      -webkit-appearance[none]
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
      transition-colors
      duration-200
      dark:text-white
      light:text-black
      font-semibold
      dark:border-white
      light:border-black
    `};
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
`;

const GlobalStyle = () => (
	<>
		<TwinGlobalStyle />
		<CustomGlobalStyle />
	</>
);

export default GlobalStyle;
