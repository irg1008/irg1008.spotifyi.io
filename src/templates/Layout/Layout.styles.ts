import tw from "twin.macro";

const Layout = tw.div`
  w-full
  h-screen
`;

const Main = tw.main`
  min-w-full
  min-h-full
  w-auto
  h-auto
  bg-gradient-to-b
  from-green-500
  to-gray-500
  flex
  flex-col
  justify-center
  items-center
  space-y-4
`;

export default { Layout, Main };
