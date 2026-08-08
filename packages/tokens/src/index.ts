export const palette = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  red: {
    50: '#fef2f2',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    900: '#7f1d1d',
  },
  green: {
    50: '#f0fdf4',
    400: '#4ade80',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
} as const;

export const space = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
} as const;

export const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
} as const;

export const fonts = {
  body: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  heading: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const zIndices = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  toast: 1700,
  tooltip: 1800,
} as const;

export const durations = {
  fast: '120ms',
  normal: '200ms',
  slow: '320ms',
} as const;

export interface SemanticColors {
  bg: string;
  bgSubtle: string;
  bgMuted: string;
  fg: string;
  fgMuted: string;
  fgOnAccent: string;
  border: string;
  borderStrong: string;
  accent: string;
  accentHover: string;
  accentActive: string;
  accentSubtle: string;
  danger: string;
  dangerHover: string;
  dangerSubtle: string;
  success: string;
  successSubtle: string;
  focusRing: string;
}

export const lightColors: SemanticColors = {
  bg: palette.white,
  bgSubtle: palette.gray[50],
  bgMuted: palette.gray[100],
  fg: palette.gray[900],
  fgMuted: palette.gray[600],
  fgOnAccent: palette.white,
  border: palette.gray[200],
  borderStrong: palette.gray[400],
  accent: palette.blue[600],
  accentHover: palette.blue[700],
  accentActive: palette.blue[900],
  accentSubtle: palette.blue[50],
  danger: palette.red[600],
  dangerHover: palette.red[700],
  dangerSubtle: palette.red[50],
  success: palette.green[700],
  successSubtle: palette.green[50],
  focusRing: palette.blue[500],
};

export const darkColors: SemanticColors = {
  bg: palette.gray[950],
  bgSubtle: palette.gray[900],
  bgMuted: palette.gray[800],
  fg: palette.gray[50],
  fgMuted: palette.gray[400],
  fgOnAccent: palette.gray[950],
  border: palette.gray[800],
  borderStrong: palette.gray[600],
  accent: palette.blue[400],
  accentHover: palette.blue[300],
  accentActive: palette.blue[100],
  accentSubtle: palette.blue[900],
  danger: palette.red[400],
  dangerHover: palette.red[500],
  dangerSubtle: palette.red[900],
  success: palette.green[400],
  successSubtle: palette.green[900],
  focusRing: palette.blue[400],
};
