import Styled from "./Tooltip.styles";
import useRefData from "hooks/useRefData";
import {
	cloneElement,
	forwardRef,
	useCallback,
	useEffect,
	useState,
} from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface ITooltipPosition {
	x: number;
	y: number;
	show: boolean;
	children: React.ReactNode;
	position: TPosition;
}

const StyledTooltip = forwardRef<HTMLDivElement, ITooltipPosition>(function fn(
	{ x, y, show, children, position },
	ref,
) {
	const horizontal: TPosition[] = ["right", "left"];
	const positive: TPosition[] = ["left", "top"];

	const variable = horizontal.includes(position) ? "x" : "y";
	const number = positive.includes(position) ? 40 : -40;

	const tooltipVariants: Variants = {
		hide: { opacity: 0, scale: 0.8 },
		show: { opacity: 1, scale: 1 },
	};

	tooltipVariants.hide[variable] = number;
	tooltipVariants.show[variable] = 0;

	return (
		<AnimatePresence>
			{show && (
				<Styled.Container {...{ x, y, ref, position }}>
					<Styled.Wrapper
						key="tooltip"
						variants={tooltipVariants}
						initial="hide"
						animate="show"
						exit="hide"
						transition={{
							type: "spring",
							stiffness: 600,
							damping: 25,
						}}
						{...{ position }}
					>
						<Styled.Tooltip>{children}</Styled.Tooltip>
						<Styled.TooltipTriangle {...{ position }} />
					</Styled.Wrapper>
				</Styled.Container>
			)}
		</AnimatePresence>
	);
});

type TPosition = "right" | "left" | "top" | "bottom";

interface ITooltipProps {
	content: React.ReactNode;
	children: React.ReactElement;
	onHoverOutclose?: boolean;
	onOutsideClickClose?: boolean;
	position?: TPosition;
}

const Tooltip = ({
	children,
	content,
	onHoverOutclose = true,
	onOutsideClickClose = true,
	position = "top",
}: ITooltipProps) => {
	const [show, setShow] = useState<boolean>();
	const open = useCallback(() => setShow(true), []);
	const close = useCallback(() => setShow(false), []);

	// CHILD REF.
	const [ref, { x, height, y, width }] = useRefData();

	let finalX = x;
	let finalY = y;

	if (position === "right") finalX += width;
	else if (position === "bottom") finalY += height;

	// TOLTIP REF.
	const [tooltipRef] = useRefData<HTMLDivElement>();

	// GETTING REF FROM CHILDREN.
	const clonedChild = cloneElement(children, { ref });

	// ON ENTER EVENT.
	ref.current?.addEventListener("mouseenter", open);
	ref.current?.addEventListener("touchstart", open);

	// ON LEAVE EVENT when "closeOnHoverOut" is true.
	if (onHoverOutclose) {
		ref.current?.addEventListener("mouseleave", close);
		ref.current?.addEventListener("touchend", close);
	}

	// ON CLICK OUTSIDE TOOLTIP AND CHILD => CLOSE. When "closeOnClickOutside" is true.
	const backDropHandler = useCallback(
		(e: MouseEvent) => {
			if (onOutsideClickClose && !onHoverOutclose) {
				const isTooltip = tooltipRef?.current?.contains(e.target as Node);

				if (!isTooltip) close();
			}
		},
		[tooltipRef, close, onOutsideClickClose, onHoverOutclose],
	);

	useEffect(() => {
		window.addEventListener("click", backDropHandler);
		return () => window.removeEventListener("click", backDropHandler);
	}, [backDropHandler]);

	return (
		<>
			<StyledTooltip
				{...{ show, position }}
				x={finalX}
				y={finalY}
				ref={tooltipRef}
			>
				{content}
			</StyledTooltip>
			{clonedChild}
		</>
	);
};

export type { ITooltipPosition, TPosition };
export default Tooltip;
