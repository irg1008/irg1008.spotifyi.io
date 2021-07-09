import Styled from "./Dropdown.styles";
import useToggle from "hooks/useToggle";
import React from "react";
import { AnimatePresence, Variant, Variants } from "framer-motion";

interface IBaseDropdownProps {
	title: string;
	openOnLoad?: boolean;
}

type IDropdownProps = IBaseDropdownProps &
	(
		| {
				children: React.ReactNode;
				onTitleClick?: never;
		  }
		| {
				children?: never;
				onTitleClick?: () => void;
		  }
	);

interface IVariants extends Variants {
	open?: Variant;
	collapsed?: Variant;
}

const Dropdown: React.FC<IDropdownProps> = ({
	children,
	openOnLoad,
	title,
	onTitleClick,
}) => {
	// 1st: Map the children and add separator.
	const isLast = (index: number) =>
		index === React.Children.count(children) - 1;
	const childrenMap = React.Children.map(children, (child, index) => (
		<>
			{child}
			{!isLast(index) && <Styled.Separator />}
		</>
	));

	const sectionVariants: IVariants = {
		open: {
			opacity: 1,
			height: "auto",
		},
		collapsed: {
			opacity: 0,
			height: 0,
		},
	};

	const [isOpen, toggleIsOpen] = useToggle(openOnLoad);

	return (
		<Styled.Container>
			<Styled.Header
				onClick={!!children ? toggleIsOpen : onTitleClick}
				{...{ isOpen }}
			>
				<Styled.Title>{title}</Styled.Title>
				{!!children && (
					<Styled.ChevronIconWrapper {...{ isOpen }}>
						<Styled.ChevronIcon />
					</Styled.ChevronIconWrapper>
				)}
			</Styled.Header>
			{!!children && (
				<AnimatePresence initial={false}>
					{isOpen && (
						<Styled.SectionWrapper
							key="wrapper"
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={sectionVariants}
							transition={{ type: "tween" }}
						>
							<Styled.Section>{childrenMap}</Styled.Section>
						</Styled.SectionWrapper>
					)}
				</AnimatePresence>
			)}
		</Styled.Container>
	);
};

export default Dropdown;
