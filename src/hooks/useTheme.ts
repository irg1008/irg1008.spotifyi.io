import { config } from "process";
import { useEffect } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ITheme {
  theme: Theme;
  toggleTheme: () => void;
}

const getToggledTheme = (oldTheme: Theme): Theme =>
  oldTheme === "dark" ? "light" : "dark";

const applyTailwindTheme = (theme: Theme) => {
  if (window) {
    const root = window.document.documentElement;
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
export type { Theme };
