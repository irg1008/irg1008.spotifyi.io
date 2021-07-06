import Styled from "./Dropdown.styles";
import { ChevronDownIcon } from "@heroicons/react/solid";
import useToggle from "hooks/useToggle";
import React, { useRef } from "react";

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

	const isLast = (index: number) =>
		index === React.Children.count(children) - 1;

	const childrenMap = React.Children.map(children, (child, index) => (
		<>
			{child}
			{!isLast(index) && <Styled.Separator />}
		</>
	));

	const contentRef = useRef<HTMLDivElement>();
	const contentHeight = contentRef.current?.clientHeight;

	return (
		<Styled.Dropdown>
			<Styled.DropdownTitleContainer
				{...{ isOpen }}
				onClick={children ? toggleIsOpen : onTitleClick}
			>
				<Styled.DropdownTitle>{title}</Styled.DropdownTitle>
				{children && (
					<>
						<Styled.ChevronButton {...{ isOpen }}>
							<ChevronDownIcon />
						</Styled.ChevronButton>
					</>
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
