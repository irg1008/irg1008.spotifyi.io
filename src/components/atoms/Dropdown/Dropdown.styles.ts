import tw from "twin.macro";
import styled, { css } from "styled-components";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Dropdown = tw.select`
  transition-colors
  rounded-lg
  overflow-hidden
  my-4
  shadow-lg
  border-2
  light:border-light-700
  dark:border-dark-700
  text-base
  font-normal
  max-w-md
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
    duration-300
    text-white
    px-3
    py-2
  `,
  isOpen &&
    tw`
      bg-opacity-80
    `,
]);

const DropdownTitle = tw.p`
  flex-1
`;

const ChevronIconWrapper = styled.div(({ isOpen }: { isOpen: boolean }) => [
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

const ContentWrapper = styled.div(
  ({ isOpen, height }: { isOpen: boolean; height: number }) => [
    tw`
      w-full
      h-0
      transition-all
      duration-200
      ease-in-out
      overflow-hidden
      light:bg-light-300
      dark:bg-dark-300
    `,
    isOpen && [
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
  ChevronIcon,
  ChevronIconWrapper,
  Separator,
  ContentWrapper,
  Content,
  DropdownTitleContainer,
};
export default Styled;
