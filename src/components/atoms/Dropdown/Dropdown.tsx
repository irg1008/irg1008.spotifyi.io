import Styled from "./Dropdown.styles";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import useToggle from "hooks/useToggle";
import React from "react";

interface IBaseDropdownProps {
	title: string;
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

const Dropdown = ({ children, title, onTitleClick }: IDropdownProps) => {
	const [isOpen, toggleIsOpen] = useToggle();

	const isLast = (index: number) =>
		index === React.Children.count(children) - 1;

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
					<>
						<Styled.ChevronButton>
							{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
						</Styled.ChevronButton>
					</>
				)}
			</Styled.DropdownTitleContainer>
			{children && (
				<Styled.Content {...{ isOpen }}>{childrenMap}</Styled.Content>
			)}
		</Styled.Dropdown>
	);
};

export default Dropdown;
