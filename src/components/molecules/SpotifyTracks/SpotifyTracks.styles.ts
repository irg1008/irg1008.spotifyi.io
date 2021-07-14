import tw from "twin.macro";

const Songs = tw.div`
  flex
  flex-wrap
  justify-center
  items-center 
  p-5
  gap-6
`;

const NotFoundText = tw.p`
  text-white
  font-light
`;

const Styled = { Songs, NotFoundText };
export default Styled;
