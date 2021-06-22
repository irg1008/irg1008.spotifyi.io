import tw from "twin.macro";
import styled from "styled-components";

const Button = tw.button`
  rounded-r-full
  w-10
  h-10
  mt-4
  bg-indigo-500!
`;

const TreeView = tw.div`
  h-full
  width[20rem]
  bg-indigo-500
  p-4
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
    z-20
    h-full
    flex
    transition-transform
    duration-500
    ease-in-out
  `,
]);

const Styled = { SideNav, Button, TreeView };
export default Styled;
