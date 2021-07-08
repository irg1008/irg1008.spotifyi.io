import tw from "twin.macro";

const Layout = tw.div`
  w-full
  h-screen
`;

const Main = tw.main`
  min-w-full
  min-h-full
  flex
  flex-col
  justify-center
  items-center
  space-y-4
  light:bg-light-300
  dark:bg-dark-500
  transition-colors
`;

const Styled = { Layout, Main };
export default Styled;
