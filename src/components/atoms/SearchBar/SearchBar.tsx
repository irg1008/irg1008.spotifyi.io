import { useRef } from "react";
import Styled from "./SearchBar.styles";

interface ISearch {
	onChange: (value: string) => void;
	ph: string;
}

const SearchBar = ({ onChange, ph }: ISearch) => {
	const inputRef = useRef<HTMLInputElement>();

	const resetValue = () => {
		const empty = "";
		inputRef.current.value = empty;
		onChange(empty);
	};

	return (
		<Styled.Container>
			<Styled.Input
				type="search"
				name="search"
				placeholder={ph || "Search"}
				onChange={(e) => onChange(e.target.value)}
				autoFocus
				ref={inputRef}
			/>
			<Styled.SearchIcon />
			<Styled.ResetIcon onClick={resetValue} />
		</Styled.Container>
	);
};

export default SearchBar;
