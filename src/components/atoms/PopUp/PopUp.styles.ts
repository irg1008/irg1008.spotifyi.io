import tw from "twin.macro";
import { motion } from "framer-motion";

const Wrapper = tw.div`
	h-screen
	w-screen
	fixed
	top-0
	left-0
	flex
	justify-center
`;

const BG = tw(motion.div)`
	backdrop-filter	
	backdrop-blur-sm
	bg-black
	bg-opacity-20
	h-full
	w-full
	absolute
	cursor-pointer
`;

const Container = tw(motion.div)`
	max-height[50%]
	max-width[30rem]
	min-height[2rem]
	min-width[2rem]
	overflow-auto
	relative
	self-end
	mb-56
	rounded-3xl
	shadow-2xl
`;

const ChildrenWrapper = tw.div`
	p-10
	light:bg-light-500
	dark:bg-dark-500
	light:bg-opacity-90
	dark:bg-opacity-90
	space-y-4
`;

const Styled = { Wrapper, BG, Container, ChildrenWrapper };
export default Styled;
