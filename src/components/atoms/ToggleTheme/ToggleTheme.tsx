import useTheme from "hooks/useTheme";
import Styled from "./ToggleTheme.styles";
import { AnimatePresence } from "framer-motion";

const ToggleTheme = () => {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Styled.Container onClick={toggleTheme}>
      <Styled.HandlerWrapper
        animate={{
          x: isDark ? "100%" : 0,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <Styled.Handle>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Styled.Icon
              key={theme}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {isDark ? <Styled.Moon /> : <Styled.Sun />}
            </Styled.Icon>
          </AnimatePresence>
        </Styled.Handle>
      </Styled.HandlerWrapper>
    </Styled.Container>
  );
};

export default ToggleTheme;
