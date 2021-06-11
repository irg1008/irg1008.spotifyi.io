import useTheme from "hooks/useTheme";
import Styled from "./ToggleFlip.styles";

const ToggleFlip = () => {
	const { toggleTheme, theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Styled.Flip>
			<Styled.InnerFlip flipped={isDark} onClick={toggleTheme}>
				<Styled.Front>
					<Styled.Sun />
				</Styled.Front>
				<Styled.Back>
					<Styled.Moon />
				</Styled.Back>
			</Styled.InnerFlip>
		</Styled.Flip>
	);
};

export default ToggleFlip;
