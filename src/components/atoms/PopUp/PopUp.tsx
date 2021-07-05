import Styled from "./PopUp.styles";
import { AnimatePresence } from "framer-motion";

interface IPopUpProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const PopUpBottomBar: React.FC<IPopUpProps> = ({
	children,
	isOpen,
	setIsOpen,
}) => {
	const onBGClick = () => setIsOpen(false);

	return (
		<AnimatePresence>
			{isOpen && (
				<Styled.Wrapper>
					<Styled.BG
						key="BG"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ type: "tween", duration: 0.2 }}
						onClick={onBGClick}
					/>
					<Styled.Container
						key="container"
						initial={{ opacity: 0, y: 100, x: -100, scale: 0.3 }}
						animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
						exit={{ opacity: 0, y: 100, x: -100, scale: 0.3 }}
						transition={{ type: "tween", duration: 0.2 }}
					>
						<Styled.ChildrenWrapper>{children}</Styled.ChildrenWrapper>
					</Styled.Container>
				</Styled.Wrapper>
			)}
		</AnimatePresence>
	);
};

export default PopUpBottomBar;
