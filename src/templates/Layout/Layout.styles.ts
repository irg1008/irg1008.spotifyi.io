import tw from "twin.macro";

const Layout = tw.div`
  w-full
  h-screen
  `;
  
const Main = tw.main`
  text-xl
  font-semibold
  min-w-full
  min-h-full
  flex
  flex-col
  justify-center
  items-center
  space-y-4
  bg-primary
`;

const Styled = { Layout, Main };
export default Styled;
