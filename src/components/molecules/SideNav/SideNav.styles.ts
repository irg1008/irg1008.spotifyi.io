import tw from "twin.macro";
import styled from "styled-components";

const SideNav = styled.div(({ isOpen }: { isOpen: boolean }) => [
	isOpen
		? tw`
      transform[translateX(0)]
    `
		: tw`
      transform[translateX(-25rem)]
    `,
	tw`
    fixed
    left-0
    top-0
    z-30
    h-full
    transition-transform
    duration-500
    ease-in-out
    max-w-full
    flex
    dark:border-dark-200
    light:border-light-200
  `,
]);

const Button = tw.button`
  rounded-r-full
  w-10
  h-10
  mt-4
  border-2
  border-l-0
  -ml-0.5
  bg-opacity-100!
  dark:bg-dark-500
  light:bg-light-500
  shadow-none
`;

const TreeView = tw.div`
  h-full
  width[25rem]
  dark:bg-dark-500
  light:bg-light-500
  p-4
  border-r-2
  overflow-y-auto
  space-y-4
`;


const Styled = { SideNav, Button, TreeView };
export default Styled;
