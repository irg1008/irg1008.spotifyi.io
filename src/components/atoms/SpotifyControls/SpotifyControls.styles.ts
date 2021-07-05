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

const Container = tw.div`
  w-full
  fixed
  bottom-0
  space-y-6
  left-0
  bg-black
  bg-opacity-60
  p-6
  backdrop-filter
  backdrop-grayscale
  backdrop-blur-md
  shadow-md
  border-t-2
  z-10
`;

const Controls = tw(motion.div)`
  flex
  justify-center
  items-center
  space-x-4
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
  items-center
  justify-around
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
  Container,
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
