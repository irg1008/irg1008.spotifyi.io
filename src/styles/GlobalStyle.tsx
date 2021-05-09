import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as TwinGlobalStyle } from "twin.macro";

const CustomGlobalStyle = createGlobalStyle`
`;

const GlobalStyle = () => (
  <>
    <CustomGlobalStyle />
    <TwinGlobalStyle />
  </>
);

export default GlobalStyle;
