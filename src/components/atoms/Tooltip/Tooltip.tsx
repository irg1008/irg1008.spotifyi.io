import Styled from "./Tooltip.styles";
import useRefData from "hooks/useRefData";
import {
	cloneElement,
	forwardRef,
	useCallback,
	useEffect,
	useState,
} from "react";
import { AnimatePresence, Variants } from "framer-motion";

interface ITooltipPosition {
	x: number;
	y: number;
	show: boolean;
	children: React.ReactNode;
}

const StyledTooltip = forwardRef<HTMLDivElement, ITooltipPosition>(function fn(
	{ x, y, show, children },
	ref,
) {
	const tooltipVariants: Variants = {
		hide: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<AnimatePresence>
			{show && (
				<Styled.Container {...{ x, y, ref }}>
					<Styled.Tooltip
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
					>
						{children}
					</Styled.Tooltip>
				</Styled.Container>
			)}
		</AnimatePresence>
	);
});

interface ITooltipProps {
	content: React.ReactNode;
	children: React.ReactElement;
	onHoverOutclose?: boolean;
	onOutsideClickClose?: boolean;
}

const Tooltip = ({
	children,
	content,
	onHoverOutclose = true,
	onOutsideClickClose = true,
}: ITooltipProps) => {
	const [show, setShow] = useState<boolean>(false);
	const open = useCallback(() => setShow(true), []);
	const close = useCallback(() => setShow(false), []);

	// CHILD REF.
	const [ref, { x, y }] = useRefData();

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
			<StyledTooltip {...{ x, y, show }} ref={tooltipRef}>
				{content}
			</StyledTooltip>
			{clonedChild}
		</>
	);
};

export type { ITooltipPosition };
export default Tooltip;
