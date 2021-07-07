import tw from "twin.macro";

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
  m-6
  bg-white
  bg-opacity-70
  rounded-3xl
  shadow-lg
  overflow-auto
`;

const SongTitle = tw.p`
  font-normal
  text-black
`;

const SongArtist = tw(SongTitle)`
  text-sm
  text-gray-800
`;

const SongImg = tw.div`
  rounded-2xl
  shadow-md
  self-center
  overflow-hidden
`;

const Audio = tw.audio`
  w-full
`;

// EMPTY CARD

const EmptyContainer = tw.div`
  light:bg-light-400
  dark:bg-dark-400
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
};
export default Styled;
