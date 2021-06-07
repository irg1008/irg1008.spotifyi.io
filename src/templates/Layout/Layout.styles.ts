import tw from "twin.macro";
import { motion } from "framer-motion";

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
  light:bg-green-300
  dark:bg-red-500
  transition-colors
`;

export default { Layout, Main };
