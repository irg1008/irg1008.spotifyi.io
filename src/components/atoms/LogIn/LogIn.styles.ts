import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/outline";

const LogIn = tw.div`
  bg-white
  bg-opacity-50
  p-3
  rounded-xl
  shadow-md
  my-2
`;

const Title = styled.h1`
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  border-radius: 0ch;
  ${tw`
    max-w-4xl
    mb-20
    text-2xl
    font-extrabold
    text-white
    drop-shadow-2xl
    md:text-8xl
    sm:text-4xl
  `}
`;

const Button = tw(motion.button)`
  border-4
  p-10
  flex
  justify-center
  items-center
  rounded-xl
  font-bold
  focus:outline-none
  text-xl
`;

const Container = tw.div`
  flex
  justify-center
  items-center
  space-y-2
  flex-col
  p-2
  text-center
  text-primary
`;

const InfoText = tw.p`
  text-xl
`;

const Arrow = tw(ArrowUpIcon)`
  h-6
  animate-bounce
  mt-2
`;

const Styled = { LogIn, Button, Container, InfoText, Arrow, Title };
export default Styled;
