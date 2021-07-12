import { TailwindColorGroup } from "tailwindcss/tailwind-config";
import Color from "color";
import { css } from "twin.macro";
import {
  blueGray as darkColor,
  teal as lightColor,
  emerald as emeraldColor,
  red as redColor,
} from "tailwindcss/colors";

/**
 * RGB object for tailwind theme.
 *
 * @interface IRGBObject
 */
interface IRGBObject {
  [key: string]: string;
}

/**
 * CONVERT TAILWIND THEMES TO RGB.
 *
 * @param {TailwindColorGroup} color
 * @return {*}  {IRGBObject}
 */
const colorToRGB = (color: TailwindColorGroup): IRGBObject => {
  // Hex string to RGB comma separated string.
  const hexToRGB = (hex: string) => Color(hex, "hex").array().join(", ");

  const RGB: IRGBObject = {};

  Object.entries(color).map(([key, hex]) => {
    RGB[key] = hexToRGB(hex);
  });

  return RGB;
};

const themes = ["light", "dark", "emerald", "nord"] as const;
type TTheme = typeof themes[number];

// THEMES PARSED FROM HEX TO RGB.
const lightTheme = colorToRGB(lightColor);
const darkTheme = colorToRGB(darkColor);
const emeralTheme = colorToRGB(emeraldColor);
const redTheme = colorToRGB(redColor);

// CSS VARIABLES FOR DIFFERENT THEMES.
const cssThemes = css`
  .light {
    --bg-primary: ${lightTheme[300]};
    --bg-secondary: ${lightTheme[100]};
    --bg-tertiary: ${lightTheme[700]};

    --text-primary: ${lightTheme[900]};
    --text-secondary: ${lightTheme[700]};
    --text-tertiary: ${lightTheme[50]};

    --button-border-width: 0;
    --button-border-color: transparent;

    --custom-radius: 1rem;
    --custom-shadow: ${`-99999px 0 0 99993px ${lightColor[400]}`};

    --accent-lighter: ${lightTheme[100]};
    --accent-light: ${lightTheme[300]};
    --accent-medium: ${lightTheme[500]};
    --accent-dark: ${lightTheme[700]};
    --accent-darker: ${lightTheme[900]};
  }

  .dark {
    --bg-primary: ${darkTheme[500]};
    --bg-secondary: ${darkTheme[600]};
    --bg-tertiary: ${darkTheme[700]};

    --text-primary: ${darkTheme[100]};
    --text-secondary: ${darkTheme[300]};
    --text-tertiary: ${darkTheme[50]};

    --button-border-width: 2px;
    --button-border-color: ${darkTheme[100]};

    --custom-radius: 9999px;
    --custom-shadow: ${`-99999px 0 0 99993px ${darkColor[400]}`};

    --accent-lighter: ${darkTheme[100]};
    --accent-light: ${darkTheme[300]};
    --accent-medium: ${darkTheme[500]};
    --accent-dark: ${darkTheme[700]};
    --accent-darker: ${darkTheme[900]};
  }

  .emerald {
    --bg-primary: ${emeralTheme[500]};
    --bg-secondary: ${emeralTheme[600]};
    --bg-tertiary: ${emeralTheme[700]};

    --text-primary: ${emeralTheme[100]};
    --text-secondary: ${emeralTheme[300]};
    --text-tertiary: ${emeralTheme[50]};

    --button-border-width: 2px;
    --button-border-color: ${emeralTheme[100]};

    --custom-radius: 9999px;
    --custom-shadow: ${`-99999px 0 0 99993px ${emeraldColor[400]}`};

    --accent-lighter: ${emeralTheme[100]};
    --accent-light: ${emeralTheme[300]};
    --accent-medium: ${emeralTheme[500]};
    --accent-dark: ${emeralTheme[700]};
    --accent-darker: ${emeralTheme[900]};
  }

  .red {
    --bg-primary: ${redTheme[500]};
    --bg-secondary: ${redTheme[600]};
    --bg-tertiary: ${redTheme[700]};

    --text-primary: ${redTheme[100]};
    --text-secondary: ${redTheme[300]};
    --text-tertiary: ${redTheme[50]};

    --button-border-width: 2px;
    --button-border-color: ${redTheme[100]};

    --custom-radius: 9999px;
    --custom-shadow: ${`-99999px 0 0 99993px ${redColor[400]}`};

    --accent-lighter: ${redTheme[100]};
    --accent-light: ${redTheme[300]};
    --accent-medium: ${redTheme[500]};
    --accent-dark: ${redTheme[700]};
    --accent-darker: ${redTheme[900]};
  }
`;

// EXPORT OF TAILWIND THEME AND CSS THEMES.
export { cssThemes, themes };
export type { TTheme };
