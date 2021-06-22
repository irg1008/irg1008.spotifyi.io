import tw from "twin.macro";
import styled from "styled-components";

const Dropdown = tw.div`
  transition-colors
  rounded-lg
  overflow-hidden
  my-4
`;

const DropdownTitleContainer = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    cursor-pointer
    flex
    justify-between
    items-center
    bg-gray-600
  `,
  isOpen &&
    tw`
    bg-green-500
    `,
]);

const DropdownTitle = tw.p`
  text-xl
  p-2
`;

const ChevronButton = tw.button`
  bg-transparent!
  h-10
  w-10
`;

const Content = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    w-full
    bg-gray-300
    hidden
    `,
    isOpen &&
    tw`
      flex
      flex-col
      space-y-3
      p-2
    `,
]);

const Styled = {
  Dropdown,
  DropdownTitle,
  ChevronButton,
  Content,
  DropdownTitleContainer,
};
export default Styled;
