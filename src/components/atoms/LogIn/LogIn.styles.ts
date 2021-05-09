import tw from "twin.macro";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/outline";

const LogIn = tw.div`
  bg-white
  bg-opacity-50
  p-3
  rounded-xl
  shadow-md
`;

const Button = tw(motion.button)`
  border-green-700
  bg-white
  bg-opacity-10
  border-4 p-10
  flex
  justify-center
  items-center
  text-green-700
  rounded-xl
  font-bold
  focus:outline-none
  text-xl
`;

const Info = tw.div`
  flex
  justify-center
  items-center
  space-y-2
  flex-col
  text-green-100
`;

const InfoText = tw.p`
  text-xl
`;

const Arrow = tw(ArrowUpIcon)`
  h-6
  animate-bounce
  mt-2
`;

export default { LogIn, Button, Info, InfoText, Arrow };
