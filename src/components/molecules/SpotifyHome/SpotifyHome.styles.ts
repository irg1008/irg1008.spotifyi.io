import tw from "twin.macro";
import {
  PlayIcon,
  PauseIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";

const Home = tw.div`
  text-xl
  font-semibold
  flex
  flex-col
  space-y-5
  relative
`;

const Title = tw.h1`
  text-6xl
  text-white
  font-extralight
  animate-pulse
  mt-5
  w-full
  text-center
`;

const Songs = tw.div`
  flex
  flex-wrap
  justify-center
  items-center 
  p-5
`;

const Card = tw.div`
  w-80
  space-y-1
  flex
  flex-col
  p-4
  m-2
  bg-white
  bg-opacity-50
  rounded-3xl
  shadow-lg
  overflow-hidden
  `;
  
  const SongTitle = tw.p`
  font-normal
  `;
  
  const SongArtist = tw(SongTitle)`
  text-gray-500
`;

const SongImg = tw.img`
  w-full
  object-scale-down
  rounded-xl
  my-4
  shadow-md
  transform
  scale-75
  -rotate-12
  origin-center
  hover:rotate-12
  transition-duration[500ms]
`;

const Audio = tw.audio`
  w-full
`;

export default {
  Home,
  Title,
  Songs,
  Card,
  SongTitle,
  SongArtist,
  SongImg,
  Audio,
};
