import tw, { styled } from "twin.macro";

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
    border-accent-light
  `,
]);

const Button = tw.div`
  rounded-r-full
  w-10
  h-10
  mt-4
  border-2
  border-l-0
  -ml-0.5
  bg-opacity-100!
  bg-accent-medium
  shadow-none
  cursor-pointer
  flex
  items-center
  justify-center
  text-accent-lighter
`;

const TreeView = tw.div`
  h-full
  width[25rem]
  bg-accent-medium
  p-4
  border-r-2
  overflow-y-auto
  space-y-4
`;

const Styled = { SideNav, Button, TreeView };
export default Styled;
