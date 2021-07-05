import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";

import {
  PlayIcon,
  PauseIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

const Controls = tw(motion.div)`
  flex
  justify-center
  items-center
  flex-wrap
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
  overflow-hidden
`;

const Progress = tw(motion.div)`
  flex
`;

const iconHeight = tw`h-8`;

const Previous = styled(ArrowCircleLeftIcon)(() => [iconHeight]);
const Play = styled(PlayIcon)(() => [iconHeight]);
const Pause = styled(PauseIcon)(() => [iconHeight]);
const Next = styled(ArrowCircleRightIcon)(() => [iconHeight]);
const Muted = styled(VolumeOffIcon)(() => [iconHeight]);
const UnMuted = styled(VolumeUpIcon)(() => [iconHeight]);

const Styled = {
  Controls,
  Button,
  Play,
  Pause,
  Previous,
  Next,
  Muted,
  UnMuted,
  Progress,
};
export default Styled;
