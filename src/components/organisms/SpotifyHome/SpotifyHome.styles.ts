import tw from "twin.macro";
import { StarIcon, EmojiSadIcon } from "@heroicons/react/solid";

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
`;

const Title = tw.h1`
  text-white
  font-extralight
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
  space-x-4
`;

const Button = tw.button`
  transition-colors
  dark:border-white
  light:border-black
  border-b-2
`;

const Img = tw.img`
  rounded-full
  h-10
  w-10
  border-2
  border-white
`;

const Name = tw.p`
  text-white
`;

const PremiumIcon = tw(StarIcon)`
  h-7
  w-7
  text-yellow-300
`;

const PoorIcon = tw(EmojiSadIcon)`
  h-7
  w-7
  text-blue-500
`;

export default {
	Home,
	Title,
	Navbar,
	Button,
	Tracks,
	Img,
	Name,
	PremiumIcon,
	PoorIcon,
};
