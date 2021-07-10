import tw from "twin.macro";

const Buttons = tw.div`
  flex
  space-x-4
`;

const Button = tw.button`
  flex-1
  rounded-custom
  text-lg
  border-button
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
  bg-secondary
  rounded-3xl
  shadow-lg
  overflow-auto
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
  shadow-md
  self-center
  overflow-hidden
`;

const Audio = tw.audio`
  w-full
`;

// EMPTY CARD

const EmptyContainer = tw.div`
  bg-small-dark
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
