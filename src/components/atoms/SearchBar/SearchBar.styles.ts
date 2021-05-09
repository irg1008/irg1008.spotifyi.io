import tw from "twin.macro";
import { SearchIcon } from "@heroicons/react/solid";

const Container = tw.div`
  relative
  text-gray-500
`;

const Input = tw.input`
  w-80
  pl-6
  pr-12
  h-10
  shadow-md
  text-base
  rounded-full
  focus:outline-none
`;

const Icon = tw(SearchIcon)`
  absolute
  right-0
  top-0
  mt-2.5 mr-4  
  h-5
`;

export default { Input, Icon, Container };
