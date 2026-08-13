import { createContext, use, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, themes, type ColorMode } from '../theme';

interface ColorModeContextValue {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

export interface DesignSystemProviderProps {
  children: ReactNode;
  /** Initial mode when uncontrolled. */
  defaultColorMode?: ColorMode;
  /** Controlled mode. Pair with `onColorModeChange`. */
  colorMode?: ColorMode;
  onColorModeChange?: (mode: ColorMode) => void;
  /** Inject the global reset and body styles. Disable if the host app owns them. */
  withGlobalStyles?: boolean;
}

export function DesignSystemProvider({
  children,
  defaultColorMode = 'light',
  colorMode: controlledColorMode,
  onColorModeChange,
  withGlobalStyles = true,
}: DesignSystemProviderProps) {
  const [uncontrolledColorMode, setUncontrolledColorMode] = useState(defaultColorMode);
  const colorMode = controlledColorMode ?? uncontrolledColorMode;

  const value = useMemo<ColorModeContextValue>(() => {
    const setColorMode = (mode: ColorMode) => {
      setUncontrolledColorMode(mode);
      onColorModeChange?.(mode);
    };
    return {
      colorMode,
      setColorMode,
      toggleColorMode: () => setColorMode(colorMode === 'light' ? 'dark' : 'light'),
    };
  }, [colorMode, onColorModeChange]);

  return (
    <ColorModeContext value={value}>
      <ThemeProvider theme={themes[colorMode]}>
        {withGlobalStyles && <GlobalStyle />}
        {children}
      </ThemeProvider>
    </ColorModeContext>
  );
}

export function useColorMode(): ColorModeContextValue {
  const context = use(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a <DesignSystemProvider>.');
  }
  return context;
}
