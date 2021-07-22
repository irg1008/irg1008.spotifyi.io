import tw, { styled } from "twin.macro";
import {HiSearch as HeroSearchIcon, HiXCircle as XIcon} from "react-icons/hi"

const Container = tw.div`
  h-10
  w-80
  relative
  text-gray-400
  focus-within:text-accent-dark
  transition-all
  duration-300
`;

const Input = tw.input`
  px-12
  w-full
  h-full
  text-base
  rounded-full
  border-2
  border-accent-dark
  border-opacity-60
  focus:(
    border-opacity-100
  )
`;

const icon = tw`
  w-5
  opacity-60
  absolute
  top-0
  h-full
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
