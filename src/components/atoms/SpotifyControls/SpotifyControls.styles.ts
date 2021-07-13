import tw, { styled, css } from "twin.macro";
import { motion } from "framer-motion";

import {
  HiPlay as PlayIcon,
  HiPause as PauseIcon,
  HiArrowCircleRight as ArrowCircleRightIcon,
  HiArrowCircleLeft as ArrowCircleLeftIcon,
  HiVolumeOff as VolumeOffIcon,
  HiVolumeUp as VolumeUpIcon,
} from "react-icons/hi";

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
  bg-accent-medium
  p-6
  border-t-2
  text-center
  flex
  flex-col
  items-center
  justify-center
  space-y-4
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
    flex
    items-center
    justify-center
    text-4xl
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
  bg-accent-lighter
  text-accent-darker
  rounded-md
  shadow-md
  text-4xl
  h-16
  w-16
  flex
  justify-center
  items-center
  overflow-hidden
  my-0!
`;

const Progress = tw(motion.div)`
  w-full
  flex
  items-center
  justify-between
  flex-wrap
  space-y-1
`;

const Text = tw.p`
  text-accent-lighter
`;

const Device = styled.p(({ active }: { active: boolean }) => [
  tw`
    text-accent-lighter
    cursor-pointer
  `,
  active &&
  tw`
    text-yellow-400
  `
]);

const Devices = tw.div`
    space-y-4
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
  Devices,
  Device,
};
export default Styled;
