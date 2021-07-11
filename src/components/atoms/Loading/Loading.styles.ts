import tw from "twin.macro";
import { RefreshIcon } from "@heroicons/react/solid";

const Loading = tw.div`
  w-full
  h-full
  flex
  justify-center
  items-center
`;

const Text = tw.p`
  text-white
  font-light
  text-xl
  text-center
  animate-pulse
`;

const LoadingIcon = tw(RefreshIcon)`
  animate-spin
  animation-direction[reverse]
  h-10
  w-10
  text-accent-darker
`;

const Styled = { Loading, LoadingIcon, Text };
export default Styled;
