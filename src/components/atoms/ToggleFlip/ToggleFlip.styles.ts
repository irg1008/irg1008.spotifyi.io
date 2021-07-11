import tw, { styled } from "twin.macro";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const Flip = tw.div`
  w-10
  h-10
  perspective[900px]
`;

const InnerFlip = styled.div(({ flipped }: { flipped: boolean }) => [
  flipped && tw`transform[rotateY(180deg)]`,
  tw`
    relative
    w-full
    h-full
    transform-style[preserve-3d]
    transition-transform
    duration-200
    ease-in-out
    cursor-pointer
    rounded-full
  `,
]);

const Side = tw.div`
  absolute
  backface-visibility[hidden]
  w-full
  h-full
  flex
  items-center
  justify-center
  rounded-full
`;

const Front = tw(Side)`
  bg-indigo-100
`;

const Back = tw(Side)`
  bg-yellow-100
  transform[rotateY(180deg)]
`;

const Icon = tw`
  h-5
  w-5
`;

const Moon = styled(MoonIcon)(() => [
  Icon,
  tw`
    text-indigo-400
  `,
]);

const Sun = styled(SunIcon)(() => [
  Icon,
  tw`
    text-yellow-500
    animate-spin
    animation-duration[15s]
  `,
]);

const Styled = { Flip, InnerFlip, Front, Back, Moon, Sun };
export default Styled;
