import tw from "twin.macro";
import { motion } from "framer-motion";

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

const SongImg = tw(motion.img)`
  w-full
  object-scale-down
  rounded-xl
  my-4
  shadow-md
  transform
  origin-center
`;

const NotFoundText = tw(SongTitle)`
  text-white
  font-light
`;

const Audio = tw.audio`
  w-full
`;

export default {
  Songs,
  Card,
  SongTitle,
  SongArtist,
  SongImg,
  NotFoundText,
  Audio,
};
