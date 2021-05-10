import tw from "twin.macro";

const Home = tw.div`
  text-xl
  font-semibold
  w-full
  h-full
  pb-40
  pt-20
  flex
  items-center
  justify-center
`;

const Tracks = tw.div`
  space-y-5
  flex
  flex-col
  items-center
  justify-center
  w-full
  h-full
`

const Title = tw.h1`
  text-6xl
  text-white
  font-extralight
  animate-pulse
  my-5
  w-full
  text-center
`;

const Navbar = tw.div`
  w-full
  fixed
  top-0
  flex
  justify-end
  items-center
  bg-black
  bg-opacity-50
  p-4
  backdrop-filter
  backdrop-grayscale
  backdrop-blur-md
  shadow-md
  border-b-2
  left-0
`;

const LogOut = tw.button`
  p-2
  border-2
  text-white
  hover:bg-white
  hover:bg-opacity-20
  transition-colors
`;

export default {
  Home,
  Title,
  Navbar,
  LogOut,
  Tracks
};
