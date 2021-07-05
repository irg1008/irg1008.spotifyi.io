import tw from "twin.macro";
import styled from "styled-components";
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
  bg-yellow-100
`;

const Back = tw(Side)`
  bg-indigo-100
  transform[rotateY(180deg)]
`;

const Moon = tw(MoonIcon)`
  h-5
  w-5
  text-indigo-400
`;

const Sun = tw(SunIcon)`
  h-5
  w-5
  text-yellow-500
`;

const Styled = { Flip, InnerFlip, Front, Back, Moon, Sun };
export default Styled;
