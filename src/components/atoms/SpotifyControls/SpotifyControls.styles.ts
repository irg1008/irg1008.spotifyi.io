import tw from "twin.macro";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import {
  PlayIcon,
  PauseIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

const Container = styled.div(
  ({ height, isOpen }: { height: number; isOpen: boolean }) => [
    tw`
    w-full
    fixed
    bottom-0
    left-0
    shadow-md
    z-20
    flex
    items-center
    flex-col
    transition-transform
    duration-300
    ease-in-out
  `,
    isOpen === false &&
      css`
        transform: translateY(${height}px);
      `,
  ]
);

const Wrapper = tw.div`
  w-full
  space-y-2
  bg-accent-medium
  p-6
  border-t-2
  text-center
`;

const Down = tw.div`
  h-8
  w-8
  text-white
  bg-black
  bg-opacity-60
  flex
  rounded-t-full
`;

const Chevron = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    w-full
    h-full
    transform
    transition-transform
    duration-200
    ease-in-out
    cursor-pointer
    delay-200
  `,
  isOpen === false &&
    tw`
      rotate-180
    `,
]);

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
  justify-between
  flex-wrap
  space-y-1
`;

const Text = tw.p`
  bg-accent-light
`;

const ConnectButton = tw.button`
  disabled:pointer-events-none
  disabled:bg-opacity-20
  disabled:cursor-not-allowed
  transition-colors
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
  Wrapper,
  Container,
  Button,
  Play,
  Pause,
  Previous,
  Next,
  Muted,
  Down,
  Chevron,
  UnMuted,
  Progress,
  Text,
  ConnectButton,
};
export default Styled;
