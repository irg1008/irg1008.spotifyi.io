import tw from "twin.macro";
import styled from "styled-components";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

interface IDropdown {
  isOpen: boolean;
}

const ChevronIconWrapper = styled.div(({ isOpen }: IDropdown) => [
  tw`
    transform
    transition-transform
    duration-200
    ease-in-out
  `,
  isOpen &&
    tw`
      rotate-180
    `,
]);

const ChevronIcon = tw(ChevronDownIcon)`
  w-6
  h-6
`;

const Separator = tw.hr`
  border-black
  border-opacity-20
  rounded-2xl
  my-3
`;

const Container = tw.div`
  rounded-lg
  overflow-hidden
  shadow-lg
  border-2
  light:border-light-700
  dark:border-dark-700
  text-base
  font-normal
  max-w-md
`;

const Header = styled.header(({ isOpen }: IDropdown) => [
  tw`
    w-full
    px-3
    py-2
    cursor-pointer
    transition-colors
    duration-300
    flex
    justify-between
    items-center
    text-white
    light:bg-light-600
    dark:bg-dark-600
    hover:(
      light:bg-light-900
      dark:bg-dark-900
    )
  `,
  isOpen &&
    tw`
  `,
]);

const Title = tw.p`

`;

const SectionWrapper = tw(motion.div)`

`;

const Section = tw.section`
  flex
  flex-col
  space-y-4
  p-2
  light:bg-light-200
  dark:bg-dark-200
`;

const Styled = {
  Container,
  Section,
  SectionWrapper,
  Title,
  Header,
  ChevronIcon,
  ChevronIconWrapper,
  Separator,
};
export default Styled;
