import { useTheme } from "theme";
import Styled from "./ToggleFlip.styles";

const ToggleFlip = () => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Styled.Flip>
			<Styled.InnerFlip flipped={isDark} onClick={toggleTheme}>
				<Styled.Front>
					<Styled.Moon />
				</Styled.Front>
				<Styled.Back>
					<Styled.Sun />
				</Styled.Back>
			</Styled.InnerFlip>
		</Styled.Flip>
	);
};

export default ToggleFlip;
