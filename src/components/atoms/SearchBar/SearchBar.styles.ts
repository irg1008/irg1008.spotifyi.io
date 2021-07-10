import tw from "twin.macro";
import styled from "styled-components";
import { SearchIcon as HeroSearchIcon, XIcon } from "@heroicons/react/solid";

const Container = tw.div`
  text-gray-500
  h-10
  w-80
  relative
  focus-within:light:text-light-600
  focus-within:dark:text-dark-700
`;

const Input = tw.input`
  px-12
  w-full
  h-full
  text-base
  rounded-full
  outline-none
  focus:ring-2
  focus:light:ring-light-600
  focus:dark:ring-dark-700
  transition-all
  duration-200
`;

const icon = tw`
  w-5
  opacity-60
  absolute
  top-0
  h-full
  transition-colors
`;

const SearchIcon = styled(HeroSearchIcon)(() => [
  icon,
  tw`
    left-0
    ml-4
  `,
]);

const ResetIcon = styled(XIcon)(() => [
  icon,
  tw`
    cursor-pointer
    right-0
    mr-4
    transition-opacity
    duration-200
    ease-in-out
    hover:opacity-100
  `,
]);

const Styled = { Input, SearchIcon, Container, ResetIcon };
export default Styled;
