import tw from "twin.macro";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const Container = tw.div`
  w-20
  bg-gray-100
  rounded-full
  shadow-inner
  light:bg-yellow-100
  dark:bg-indigo-100
  cursor-pointer
`;

const HandlerWrapper = tw(motion.div)`
  w-1/2
`;

const Handle = tw.div`
  w-7
  h-7
  m-1.5
  rounded-full
  bg-black
  overflow-hidden
  flex
  items-center
  justify-center
  shadow-lg
`;

const Icon = tw(motion.div)`
  h-5
  w-5
`;

const Moon = tw(MoonIcon)`
  text-indigo-400
`;

const Sun = tw(SunIcon)`
  text-yellow-500
`;

const Styled = { Container, Handle, HandlerWrapper, Icon, Moon, Sun };
export default Styled;
