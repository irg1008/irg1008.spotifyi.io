import tw from "twin.macro";
import styled from "styled-components";

const Dropdown = tw.div`
  transition-colors
  rounded-lg
  overflow-hidden
  my-4
  shadow-lg
  border-2
  border-black
  border-opacity-50
`;

const DropdownTitleContainer = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    cursor-pointer
    flex
    justify-between
    items-center
    bg-black
    bg-opacity-50
    hover:bg-opacity-80
    transition-colors
    duration-200
  `,
  isOpen &&
    tw`
    bg-opacity-80
  `,
]);

const DropdownTitle = tw.p`
  text-xl
  p-2
  text-white
  flex[8]
`;

const ChevronButton = tw.div`
  text-white
  h-10
  w-10
  p-2
  flex-1
  flex
  justify-center
  items-center
`;

const Content = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    w-full
    bg-gray-200
    text-black
    bg-opacity-80
    h-0
    flex
    flex-col
    space-y-3
    `,
  isOpen &&
    tw`
      p-2
      h-auto
    `,
]);

const Separator = tw.hr`
  border-black
  border-opacity-20
  rounded-2xl
`;

const Styled = {
  Dropdown,
  DropdownTitle,
  ChevronButton,
  Separator,
  Content,
  DropdownTitleContainer,
};
export default Styled;
