import tw from "twin.macro";
import { motion } from "framer-motion";

const Home = tw.div`
  text-xl
  font-semibold
  flex
  flex-col
  items-center
  justify-center
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

const Songs = tw(motion.div)`
  flex
  flex-wrap
  justify-center
  items-center 
  p-5
`;

const Card = tw(motion.div)`
  w-80
  space-y-1
  flex
  flex-col
  p-4
  m-2
  bg-white
  bg-opacity-70
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

const NotFoundText = tw(SongTitle)`
  text-white
  font-light
`;

const SongImg = tw(motion.img)`
  w-full
  object-scale-down
  rounded-xl
  my-4
  shadow-md
  transform
  origin-center
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
  NotFoundText,
};
