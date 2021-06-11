import { ChangeEventHandler } from "react";
import Styled from "./SearchBar.styles";

interface ISearch {
	onChange: (value: string) => void;
	ph: string;
}

const SearchBar = ({ onChange, ph }: ISearch) => {
	return (
		<Styled.Container>
			<Styled.Input
				type="search"
				name="search"
				placeholder={ph || "Search"}
				onChange={(e) => onChange(e.target.value)}
				autoFocus
			/>
			<Styled.Icon />
		</Styled.Container>
	);
};

export default SearchBar;
