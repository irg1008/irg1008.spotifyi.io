import tw from "twin.macro";

const Buttons = tw.div`
  flex
  space-x-4
`;

const Button = tw.button`
  flex-1
  dark:rounded-full
  light:rounded-2xl
  text-lg
  dark:border-2
  dark:border-dark-100
`;

const Card = tw.div`
  w-80
  h-96
  space-y-3
  flex
  flex-col
  justify-between
  p-4
  m-6
  light:bg-light-100
  dark:bg-dark-600
  rounded-3xl
  shadow-lg
  overflow-auto
`;

const SongTitle = tw.p`
  font-normal
  light:text-light-900
  dark:text-dark-100
`;

const SongArtist = tw(SongTitle)`
  text-sm
  light:text-light-800
  dark:text-dark-300
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
