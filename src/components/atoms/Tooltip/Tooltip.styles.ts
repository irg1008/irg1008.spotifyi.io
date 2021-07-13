import tw, { css, styled, TwStyle } from "twin.macro";
import { motion } from "framer-motion";
import { ITooltipPosition, TPosition } from "./Tooltip";

const spacing = 25;

const tooltipContainerPosition = ({
  x,
  y,
  position,
}: Pick<ITooltipPosition, "x" | "y" | "position">) => {
  switch (position) {
    case "left":
      return css`
        top: ${y}px;
        left: ${x - spacing}px;
      `;
    case "right":
      return css`
        top: ${y}px;
        left: ${x - spacing}px;
      `;
    case "top":
      return css`
        top: ${y - spacing}px;
        left: ${x}px;
      `;
    case "bottom":
      return css`
        top: ${y - spacing}px;
        left: ${x}px;
      `;
  }
};

const tooltipContainerStyles: Record<TPosition, TwStyle> = {
  left: tw`
    -translate-x-full
    -translate-y-1/2
  `,
  right: tw`
    -translate-y-1/2
  `,
  top: tw`
    -translate-x-1/2
    -translate-y-full
  `,
  bottom: tw`
    -translate-x-1/2
  `,
};

const Container = styled.div(
  (props: Pick<ITooltipPosition, "x" | "y" | "position">) => [
    tw`
      absolute
      transform
      m-0!
  `,
    tooltipContainerPosition(props),
    tooltipContainerStyles[props.position],
  ]
);

const tooltipWrapperStyles: Record<TPosition, TwStyle> = {
  left: tw`
    flex-row
  `,
  right: tw`
    flex-row-reverse
  `,
  top: tw`
    flex-col
  `,
  bottom: tw`
    flex-col-reverse
  `,
};

const Wrapper = styled(motion.div)(({ position }: { position: TPosition }) => [
  tooltipWrapperStyles[position],
  tw`
    flex
    justify-center
    items-center
  `,
]);

const Tooltip = tw.div`
  backdrop-filter
  backdrop-blur
  bg-opacity-80
  bg-accent-darker
  text-white
  rounded-lg
  shadow-lg
  p-2
  border[3px solid black]
  text-base
`;

const tooltipTriangleStyles: Record<TPosition, TwStyle> = {
  left: tw`
    -ml-0.5
    border-left-color[black]
  `,
  right: tw`
    -mr-0.5
    border-right-color[black]
  `,
  top: tw`
    -mt-0.5
    border-top-color[black]
  `,
  bottom: tw`
    -mb-0.5
    border-bottom-color[black]
  `,
};

const TooltipTriangle = styled.div(({ position }: { position: TPosition }) => [
  tw`
    border-width[8px]
    border-transparent
  `,
  tooltipTriangleStyles[position],
]);

const Styled = { Tooltip, Container, TooltipTriangle, Wrapper };
export default Styled;
