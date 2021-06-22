import tw from "twin.macro";
import styled from "styled-components";

const Dropdown = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    flex
    justify-between
    flex-wrap
    items-center
    transition-colors
    rounded-lg
    overflow-hidden
    bg-gray-600
    my-4
    cursor-pointer
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
    h-0
    overflow-hidden
    flex
    flex-col
    space-y-3
  `,
  isOpen &&
    tw`
      h-auto
      p-2
    `,
]);

const Styled = { Dropdown, DropdownTitle, ChevronButton, Content };
export default Styled;
