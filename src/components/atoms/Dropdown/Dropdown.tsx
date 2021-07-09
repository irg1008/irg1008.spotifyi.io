import Styled from "./Dropdown.styles";
import { ChevronDownIcon } from "@heroicons/react/outline";
import useToggle from "hooks/useToggle";
import React from "react";
import useRefHeight from "hooks/useRefHeight";

// NOTE FOR FUTURE IVÁN: Dropdown needs the children directly passed. A react fragment will be just ONE child.

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

const Dropdown = ({
	children,
	title,
	onTitleClick,
	openOnLoad,
}: IDropdownProps) => {
	const [isOpen, toggleIsOpen] = useToggle(openOnLoad);
	const [contentRef, contentHeight] = useRefHeight<HTMLDivElement>();

	const isLast = (index: number) =>
		index === React.Children.count(children) - 1;

	// 1st: Map the children and add separator.
	const childrenMap = React.Children.map(children, (child, index) => (
		<>
			{child}
			{!isLast(index) && <Styled.Separator />}
		</>
	));

	return (
		<Styled.Dropdown>
			<Styled.DropdownTitleContainer
				{...{ isOpen }}
				onClick={children ? toggleIsOpen : onTitleClick}
			>
				<Styled.DropdownTitle>{title}</Styled.DropdownTitle>
				{children && (
					<Styled.ChevronIconWrapper {...{ isOpen }}>
						<Styled.ChevronIcon />
					</Styled.ChevronIconWrapper>
				)}
			</Styled.DropdownTitleContainer>
			{children && (
				<Styled.ContentWrapper {...{ isOpen }} height={contentHeight}>
					<Styled.Content ref={contentRef} {...{ isOpen }}>
						{childrenMap}
					</Styled.Content>
				</Styled.ContentWrapper>
			)}
		</Styled.Dropdown>
	);
};

export default Dropdown;
