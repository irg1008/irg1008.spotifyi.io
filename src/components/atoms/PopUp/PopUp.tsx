import Styled from "./PopUp.styles";
import { AnimatePresence, Variant, Variants } from "framer-motion";

interface IPopUpProps {
	isOpen: boolean;
	onBGClick: () => void;
}

interface IVariants extends Variants {
	initial: Variant;
	animate: Variant;
}

const PopUpBottomBar: React.FC<IPopUpProps> = ({
	children,
	isOpen,
	onBGClick,
}) => {
	const containerVariants: IVariants = {
		initial: { opacity: 0, y: "100%", scale: 0.3 },
		animate: { opacity: 1, y: 0, scale: 1 },
	};

	const bgVariants: IVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	};

	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<Styled.Wrapper>
					<Styled.BG
						key="BG"
						variants={bgVariants}
						initial="initial"
						animate="animate"
						exit="initial"
						transition={{ type: "tween", duration: 0.2 }}
						onClick={onBGClick}
					/>
					<Styled.Container
						key="container"
						variants={containerVariants}
						initial="initial"
						animate="animate"
						exit="initial"
						transition={{
							type: "spring",
							stiffness: 600,
							damping: 25,
						}}
					>
						<Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
					</Styled.Container>
				</Styled.Wrapper>
			)}
		</AnimatePresence>
	);
};

export default PopUpBottomBar;
