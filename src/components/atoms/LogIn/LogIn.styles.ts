import tw from "twin.macro";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/outline";
import styled from "styled-components";

const LogIn = tw.div`
  bg-white
  bg-opacity-50
  p-3
  rounded-xl
  shadow-md
`;

const Title = styled.h1`
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  ${tw`
    text-8xl
    text-white
    font-extrabold
    mb-20
    drop-shadow-2xl
    text-center
    md:text-4xl
  `}
`;

const Container = tw.div`
  flex
  flex-col
  justify-around
`;

const Button = tw(motion.button)`
  border-green-700
  bg-white
  bg-opacity-10
  border-4 p-10
  flex
  justify-center
  items-center
  text-green-700
  rounded-xl
  font-bold
  focus:outline-none
  text-xl
`;

const Info = tw.div`
  flex
  justify-center
  items-center
  space-y-2
  flex-col
  text-green-100
`;

const InfoText = tw.p`
  text-xl
`;

const Arrow = tw(ArrowUpIcon)`
  h-6
  animate-bounce
  mt-2
`;

export default { LogIn, Button, Info, InfoText, Arrow, Title, Container };
