import tw from "twin.macro";
import styled from "styled-components";

import {
  PlayIcon,
  PauseIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";

const Controls = tw.div`
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
`;

const Button = tw.button`
  bg-white
  bg-opacity-80
  p-4 rounded-md
  focus:outline-none
  shadow-md
  text-4xl
`;

const iconHeight = tw`h-8`;

const Previous = styled(ArrowCircleLeftIcon)(() => [iconHeight]);
const Play = styled(PlayIcon)(() => [iconHeight]);
const Pause = styled(PauseIcon)(() => [iconHeight]);
const Next = styled(ArrowCircleRightIcon)(() => [iconHeight]);

export default { Controls, Button, Play, Pause, Previous, Next };
