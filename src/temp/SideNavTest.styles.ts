import tw from "twin.macro";

const Container = tw.div`
  h-80
  w-full
  bg-white
  rounded-lg
  grid
  grid-cols-5
  gap-2
`;

const DraggableBox = tw.div`
  flex
  h-10
  w-10
  bg-black
  rounded-md
  cursor-move
  self-center
  justify-self-center
`;

const Styled = { Container, DraggableBox };
export default Styled;
