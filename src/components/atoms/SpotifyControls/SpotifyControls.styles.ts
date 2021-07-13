import tw, { styled, css } from "twin.macro";
import { motion } from "framer-motion";
import { MdDevices } from "react-icons/md";
import { CgLoadbarSound } from "react-icons/cg";
import {
  HiPlay,
  HiPause,
  HiArrowCircleRight,
  HiArrowCircleLeft,
  HiVolumeOff,
  HiVolumeUp,
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
  p-8
  border-t-2
  text-center
  flex
  flex-col
  items-center
  justify-center
  gap-4
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
  gap-4
`;

const Button = tw(motion.button)`
  bg-accent-lighter
  text-accent-darker
  rounded-md
  shadow-md
  text-3xl
  h-12
  w-12
  flex
  justify-center
  items-center
  overflow-hidden
`;

const Progress = tw(motion.div)`
  w-full
  flex
  items-center
  justify-between
  flex-wrap
  space-y-1
`;

const Text = tw.div`
  text-accent-lighter
`;

const Device = styled.p(({ active }: { active: boolean }) => [
  tw`
    text-accent-lighter
    cursor-pointer
    flex
    justify-center
    items-center
    gap-1
    transition-colors
  `,
  active
    ? tw`
        text-yellow-400
      `
    : tw`
        hover:(
          text-accent-light
        )
      `,
]);

const SoundIcon = tw(CgLoadbarSound)`
  flex
  justify-center
  items-center
  animate-pulse
  text-3xl
`;

const Devices = tw.div`
    space-y-4
`;

const iconHeight = tw`h-8`;

const PreviousIcon = styled(HiArrowCircleLeft)(() => [iconHeight]);
const PlayIcon = styled(HiPlay)(() => [iconHeight]);
const PauseIcon = styled(HiPause)(() => [iconHeight]);
const NextIcon = styled(HiArrowCircleRight)(() => [iconHeight]);
const MutedIcon = styled(HiVolumeOff)(() => [iconHeight]);
const UnMutedIcon = styled(HiVolumeUp)(() => [iconHeight]);
const DevicesIcon = styled(MdDevices)(() => [iconHeight]);

const Styled = {
  Controls,
  Wrapper,
  Container,
  Button,
  PlayIcon,
  PauseIcon,
  PreviousIcon,
  NextIcon,
  MutedIcon,
  UnMutedIcon,
  Down,
  Chevron,
  Progress,
  Text,
  Devices,
  Device,
  SoundIcon,
  DevicesIcon,
};
export default Styled;
