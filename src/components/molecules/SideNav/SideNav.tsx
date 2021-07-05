import Styled from "./SideNav.styles";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

interface IHeaderProps {}

const SideNav: React.FC<IHeaderProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>();
	const toggleIsOpen = () => setIsOpen(!isOpen);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	return (
		<Styled.SideNav {...{ isOpen }}>
			<Styled.TreeView>{children}</Styled.TreeView>
			<Styled.Button onClick={toggleIsOpen}>
				{isOpen ? <XIcon /> : <MenuIcon />}
			</Styled.Button>
		</Styled.SideNav>
	);
};

export default SideNav;
