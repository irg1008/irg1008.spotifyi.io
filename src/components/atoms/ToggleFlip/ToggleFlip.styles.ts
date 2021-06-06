import tw from "twin.macro";
import styled from "styled-components";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const Flip = tw.div`
  w-10
  h-10
  perspective[900px]
`;

const InnerFlip = styled.div<{ flipped: boolean }>`
  transition: transform 0.2s ease-in-out;
  ${({ flipped }) => flipped && tw`transform[rotateY(180deg)]`};
  ${tw`
    relative
    w-full
    h-full
    transform-style[preserve-3d]
  `};
`;

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
  transform[rotateY(180deg)]
`;

const Back = tw(Side)`
  bg-yellow-100
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

export default { Flip, InnerFlip, Front, Back, Moon, Sun };
