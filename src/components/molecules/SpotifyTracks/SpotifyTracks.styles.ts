import tw from "twin.macro";
import { motion } from "framer-motion";

const Songs = tw.div`
  flex
  flex-wrap
  justify-center
  items-center 
  p-5
`;

const Buttons = tw.div`
  flex
  space-x-4
`;

const Button = tw.button`
  flex-1
  rounded-full
  text-lg
`;

const Card = tw.div`
  w-80
  h-96
  space-y-4
  flex
  flex-col
  justify-between
  p-4
  m-2
  bg-white
  bg-opacity-70
  rounded-3xl
  shadow-lg
  overflow-auto
`;

const SongTitle = tw.p`
  font-normal
  dark:text-black
`;

const SongArtist = tw(SongTitle)`
  text-sm
  dark:text-gray-800
`;

const SongImg = tw.div`
  rounded-2xl
  shadow-md
  self-center
  overflow-hidden
`;

const NotFoundText = tw(SongTitle)`
  text-white
  font-light
`;

const Audio = tw.audio`
  w-full
`;

const Styled = {
  Songs,
  Card,
  SongTitle,
  SongArtist,
  SongImg,
  NotFoundText,
  Audio,
  Buttons,
  Button,
};
export default Styled;
