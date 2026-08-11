import {
  breakpoints,
  darkColors,
  durations,
  fontSizes,
  fontWeights,
  fonts,
  lightColors,
  lineHeights,
  radii,
  shadows,
  space,
  zIndices,
  type SemanticColors,
} from '@100xbansal/tokens';

export type ColorMode = 'light' | 'dark';

const scales = {
  space,
  radii,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  shadows,
  breakpoints,
  zIndices,
  durations,
};

export type Theme = typeof scales & {
  colorMode: ColorMode;
  colors: SemanticColors;
};

export const lightTheme: Theme = { ...scales, colorMode: 'light', colors: lightColors };
export const darkTheme: Theme = { ...scales, colorMode: 'dark', colors: darkColors };

export const themes: Record<ColorMode, Theme> = { light: lightTheme, dark: darkTheme };
