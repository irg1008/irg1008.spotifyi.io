import tw from "twin.macro";
import { motion } from "framer-motion";

const ButtonsContainer = tw(motion.div)`
`;

const Buttons = tw.div`
  mt-4
  flex
  gap-4
`;

const Button = tw.button`
  flex-1
  rounded-custom
  text-lg
  border-button
  overflow-hidden
`;

const Card = tw.div`
  w-80
  h-80
  flex
  flex-col
  justify-between
  p-4
  bg-secondary
  rounded-3xl
  overflow-hidden
  box-shadow[
    inset 3px 3px 8px rgba(0, 0, 0, 0.4),
    inset -3px -3px 8px rgba(255, 255, 255, 0.2)]
`;

const SongTitle = tw.p`
  font-normal
  text-primary
`;

const SongArtist = tw(SongTitle)`
  text-sm
  text-secondary
`;

const SongImg = tw.div`
  rounded-2xl
  self-center
  overflow-hidden
  flex
  items-end
  mt-3
  box-shadow[
    3px 3px 5px rgba(0, 0, 0, 0.4),
    -3px -3px 10px rgba(255, 255, 255, 0.2)]
`;

const Audio = tw.audio`
  w-full
`;

// EMPTY CARD

const EmptyContainer = tw.div`
  bg-accent-light
  rounded-full
  animate-pulse
`;

const EmptyTitle = tw(EmptyContainer)`
  w-56
  h-6
`;

const EmptyArtist = tw(EmptyContainer)`
  w-32
  h-5
`;

const EmptyImage = tw(EmptyContainer)`
  h-full
  w-full
  rounded-3xl
`;

const EmptyButton = tw(EmptyContainer)`
  w-full
  h-12
`;

const Styled = {
  Card,
  SongTitle,
  SongArtist,
  SongImg,
  Audio,
  Buttons,
  Button,
  EmptyTitle,
  EmptyArtist,
  EmptyButton,
  EmptyImage,
  ButtonsContainer,
};
export default Styled;
