import Styled from "./Dropdown.styles";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

interface IDropdownProps {
	title: string;
}

const Dropdown: React.FC<IDropdownProps> = ({ children, title }) => {
	const [isOpen, setIsOpen] = useState<boolean>();
	const toggleIsOpen = () => children && setIsOpen(!isOpen);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	return (
		<Styled.Dropdown {...{ isOpen }} onClick={toggleIsOpen}>
			<Styled.DropdownTitle>{title}</Styled.DropdownTitle>
			{children && (
				<>
					<Styled.ChevronButton>
						{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
					</Styled.ChevronButton>
					<Styled.Content {...{ isOpen }}>{children}</Styled.Content>
				</>
			)}
		</Styled.Dropdown>
	);
};

export default Dropdown;
