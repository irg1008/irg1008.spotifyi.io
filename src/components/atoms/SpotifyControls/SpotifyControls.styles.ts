import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";

import {
  PlayIcon,
  PauseIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/solid";

const Controls = tw(motion.div)`
  flex
  justify-center
  w-full
  fixed
  bottom-0
  left-0
  bg-black
  bg-opacity-60
  p-6
  backdrop-filter
  backdrop-grayscale
  backdrop-blur-md
  shadow-md
  border-t-2
  space-x-4
  h-28
  z-10
`;

const Button = tw(motion.button)`
  bg-white
  rounded-md
  shadow-md
  text-4xl
  h-16
  w-16
  flex
  justify-center
  items-center
`;

const iconHeight = tw`h-8`;

const Previous = styled(ArrowCircleLeftIcon)(() => [iconHeight]);
const Play = styled(PlayIcon)(() => [iconHeight]);
const Pause = styled(PauseIcon)(() => [iconHeight]);
const Next = styled(ArrowCircleRightIcon)(() => [iconHeight]);

const Styled = { Controls, Button, Play, Pause, Previous, Next };
export default Styled;
