import Styled from "./SideNav.styles";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface IHeaderProps {
	openOnLoad?: boolean;
}

const SideNav: React.FC<IHeaderProps> = ({ children, openOnLoad = false }) => {
	const [isOpen, setIsOpen] = useState<boolean>(openOnLoad);
	const toggleIsOpen = () => setIsOpen(!isOpen);

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
