import tw from "twin.macro";
import styled from "styled-components";

const Button = tw.button`
  rounded-r-full
  w-10
  h-10
  mt-4
`;

const TreeView = tw.div`
  h-full
  width[20rem]
  dark:bg-dark-500
  light:bg-light-500
  p-4
  border-r-2
  dark:border-dark-200
  light:border-light-200
  overflow-y-auto
`;

const SideNav = styled.div(({ isOpen }: { isOpen: boolean }) => [
	isOpen
		? tw`
      transform[translateX(0)]
    `
		: tw`
      transform[translateX(-20rem)]
    `,
	tw`
    fixed
    z-30
    h-full
    flex
    transition-transform
    duration-500
    ease-in-out
    max-w-full
  `,
]);

const Styled = { SideNav, Button, TreeView };
export default Styled;
