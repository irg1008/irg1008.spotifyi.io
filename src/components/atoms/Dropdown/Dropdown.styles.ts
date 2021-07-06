import tw from "twin.macro";
import styled, { css } from "styled-components";

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
  text-lg
  p-2
  text-white
  flex[8]
`;

const ChevronButton = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
  text-white
  h-10
  w-10
  p-2
  flex-1
  flex
  justify-center
  items-center
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

const ContentWrapper = styled.div(
  ({ isOpen, height }: { isOpen: boolean; height: number }) => [
    tw`
      w-full
      h-0
      transition-all
      duration-200
      ease-in-out
      overflow-hidden
      bg-gray-200
      bg-opacity-80
    `,
    isOpen && [
      tw`
      `,
      css`
        height: ${height}px;
      `,
    ],
  ]
);

const Content = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`
    text-black
    flex
    flex-col
    p-2
    transform
    translate-y-10
    transition-transform
    duration-300
    ease-in-out
  `,
  isOpen &&
    tw`
      translate-y-0
    `,
]);

const Separator = tw.hr`
  border-black
  border-opacity-20
  rounded-2xl
  my-3
`;

const Styled = {
  Dropdown,
  DropdownTitle,
  ChevronButton,
  Separator,
  ContentWrapper,
  Content,
  DropdownTitleContainer,
};
export default Styled;
