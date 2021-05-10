import tw from "twin.macro";

const Home = tw.div`
  text-xl
  font-semibold
  flex
  flex-col
  items-center
  justify-center
  space-y-5
  mb-40
  mt-10
`;

const Title = tw.h1`
  text-6xl
  text-white
  font-extralight
  animate-pulse
  my-5
  w-full
  text-center
`;

export default {
  Home,
  Title,
};
