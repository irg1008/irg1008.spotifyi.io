import { useEffect } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import { TTheme, themes } from "styles/theme";

interface ITheme {
  theme: TTheme;
  toggleTheme: () => void;
  setTheme: (theme: TTheme) => void;
}

const getToggledTheme = (oldTheme: TTheme): TTheme =>
  oldTheme === "dark" ? "light" : "dark";

const applyTailwindTheme = (newTheme: TTheme) => {
  if (window) {
    const root = document.documentElement;

    // Remove all previous themes:
    themes.forEach((oldTheme) => {
      if (newTheme !== oldTheme) root.classList.remove(oldTheme);
    });

    // Add new theme.
    root.classList.add(newTheme);
  }
};

const useThemeStore = create<ITheme>(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => {
        set(({ theme: oldTheme }) => ({ theme: getToggledTheme(oldTheme) }));
      },
      setTheme: (theme) => set(() => ({ theme })),
    }),
    {
      name: "theme",
    }
  )
);

const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    applyTailwindTheme(theme);
  }, [theme]);

  return { theme, toggleTheme, setTheme };
};

export default useTheme;
