import tw, { css, styled } from "twin.macro";
import { motion } from "framer-motion";

const Container = styled.div(({ x, y }: { x: number; y: number }) => [
  css`
    top: ${y - 60}px;
    left: ${x}px;
  `,
  tw`
    absolute
    transform
    -translate-x-1/2
    -translate-y-full
  `,
]);

const Tooltip = tw(motion.div)`
  backdrop-filter
  backdrop-blur
  bg-opacity-80
  bg-accent-darker
  text-white
  rounded-lg
  shadow-lg
  p-4
  border-4
  border-black
  relative
  after:(
    content
    absolute
    top-full
    mt-1
    transform
    -translate-x-1/2
    border-width[12px]
    border-top-color[black]
    border-right-color[transparent]
    border-bottom-color[transparent]
    border-left-color[transparent]
  )
`;

const Styled = { Tooltip, Container };
export default Styled;
