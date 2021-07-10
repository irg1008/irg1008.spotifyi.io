import { useEffect } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

type TTheme = "light" | "dark" | "emerald" | "pink" | "nord";

interface ITheme {
  theme: TTheme;
  toggleTheme: () => void;
}

const getToggledTheme = (oldTheme: TTheme): TTheme =>
  oldTheme === "dark" ? "light" : "dark";

const applyTailwindTheme = (theme: TTheme) => {
  if (window) {
    const root = document.documentElement;
    root.classList.remove(getToggledTheme(theme));
    root.classList.add(theme);
  }
};

const useThemeStore = create<ITheme>(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => {
        set(({ theme: oldTheme }) => ({ theme: getToggledTheme(oldTheme) }));
      },
    }),
    {
      name: "theme",
    }
  )
);

const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    applyTailwindTheme(theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
