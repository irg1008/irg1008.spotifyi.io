import useTheme from "hooks/useTheme";
import Styled from "./ToggleFlip.styles";

const ToggleFlip = () => {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Styled.Flip onClick={toggleTheme}>
      <Styled.InnerFlip flipped={isDark}>
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
