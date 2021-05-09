import { createGlobalStyle } from "styled-components";
import { GlobalStyles as TwinGlobalStyle } from "twin.macro";

const CustomGlobalStyle = createGlobalStyle`
  input[type="search"]::-webkit-search-cancel-button {
      -webkit-appearance: none;
      display: none;
  }
`;

const GlobalStyle = () => (
  <>
    <CustomGlobalStyle />
    <TwinGlobalStyle />
  </>
);

export default GlobalStyle;
