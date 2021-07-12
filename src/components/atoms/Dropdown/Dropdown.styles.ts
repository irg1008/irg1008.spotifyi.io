import tw, { styled } from "twin.macro";
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
  border-accent-darker
  font-size[initial]
  font-normal
  max-w-md
`;

const Header = styled.header(({ isOpen }: IDropdown) => [
  tw`
    w-full
    px-3
    py-2
    cursor-pointer
    duration-300
    flex
    justify-between
    items-center
    text-white
    bg-accent-dark
    hover:(
      bg-accent-darker
    )
  `,
  isOpen &&
    tw`
    bg-accent-darker
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
  bg-accent-light
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
