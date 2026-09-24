import styled, { css, keyframes, type DefaultTheme, type RuleSet } from 'styled-components';

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'soft' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonShape = 'rounded' | 'pill';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $shape: ButtonShape;
  $fullWidth: boolean;
  $iconOnly: boolean;
}

/** Tints `color` toward `base`; used for hover states of the soft variant. */
const tint = (color: string, base: string, amount: number) =>
  `color-mix(in srgb, ${color} ${amount}%, ${base})`;

const variantStyles: Record<ButtonVariant, (theme: DefaultTheme) => RuleSet> = {
  primary: ({ colors, shadows }) => css`
    background: ${colors.accent};
    color: ${colors.fgOnAccent};
    box-shadow: ${shadows.sm};
    &:hover:not(:disabled) {
      background: ${colors.accentHover};
      box-shadow: ${shadows.md};
    }
    &:active:not(:disabled) {
      background: ${colors.accentActive};
      box-shadow: ${shadows.sm};
    }
  `,
  secondary: ({ colors, shadows }) => css`
    background: ${colors.bg};
    color: ${colors.fg};
    border-color: ${colors.border};
    box-shadow: ${shadows.sm};
    &:hover:not(:disabled) {
      background: ${colors.bgSubtle};
      border-color: ${colors.borderStrong};
    }
    &:active:not(:disabled) {
      background: ${colors.bgMuted};
    }
  `,
  outline: ({ colors }) => css`
    background: transparent;
    color: ${colors.accent};
    border-color: ${colors.accent};
    &:hover:not(:disabled) {
      background: ${colors.accentSubtle};
    }
    &:active:not(:disabled) {
      background: ${tint(colors.accent, colors.accentSubtle, 12)};
    }
  `,
  soft: ({ colors }) => css`
    background: ${colors.accentSubtle};
    color: ${colors.accent};
    &:hover:not(:disabled) {
      background: ${tint(colors.accent, colors.accentSubtle, 12)};
    }
    &:active:not(:disabled) {
      background: ${tint(colors.accent, colors.accentSubtle, 22)};
    }
  `,
  ghost: ({ colors }) => css`
    background: transparent;
    color: ${colors.fg};
    &:hover:not(:disabled) {
      background: ${colors.bgMuted};
    }
    &:active:not(:disabled) {
      background: ${tint(colors.fg, colors.bgMuted, 8)};
    }
  `,
  danger: ({ colors, shadows }) => css`
    background: ${colors.danger};
    color: ${colors.fgOnAccent};
    box-shadow: ${shadows.sm};
    &:hover:not(:disabled) {
      background: ${colors.dangerHover};
      box-shadow: ${shadows.md};
    }
    &:active:not(:disabled) {
      box-shadow: ${shadows.sm};
    }
  `,
  link: ({ colors }) => css`
    height: auto;
    padding-inline: 0;
    background: transparent;
    color: ${colors.accent};
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.25em;
    &:hover:not(:disabled) {
      color: ${colors.accentHover};
      text-decoration-color: currentColor;
    }
    &:active:not(:disabled) {
      transform: none;
    }
  `,
};

const sizeStyles: Record<ButtonSize, (theme: DefaultTheme) => RuleSet> = {
  sm: ({ space, fontSizes }) => css`
    height: 2rem;
    padding-inline: ${space[3]};
    font-size: ${fontSizes.sm};
    --icon-only-size: 2rem;
  `,
  md: ({ space, fontSizes }) => css`
    height: 2.5rem;
    padding-inline: ${space[4]};
    font-size: ${fontSizes.sm};
    --icon-only-size: 2.5rem;
  `,
  lg: ({ space, fontSizes }) => css`
    height: 3rem;
    padding-inline: ${space[6]};
    font-size: ${fontSizes.md};
    --icon-only-size: 3rem;
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;
  border-radius: ${({ theme, $shape }) => ($shape === 'pill' ? theme.radii.full : theme.radii.lg)};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  letter-spacing: -0.005em;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color ${({ theme }) => theme.durations.fast} ease,
    border-color ${({ theme }) => theme.durations.fast} ease,
    color ${({ theme }) => theme.durations.fast} ease,
    box-shadow ${({ theme }) => theme.durations.normal} ease,
    text-decoration-color ${({ theme }) => theme.durations.fast} ease,
    transform ${({ theme }) => theme.durations.fast} ease;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: none;
  }

  &[aria-busy='true'] {
    cursor: progress;
  }

  svg {
    flex-shrink: 0;
    width: 1.15em;
    height: 1.15em;
  }

  ${({ theme, $size }) => sizeStyles[$size](theme)}
  ${({ theme, $variant }) => variantStyles[$variant](theme)}

  ${({ $iconOnly }) =>
    $iconOnly &&
    css`
      width: var(--icon-only-size);
      height: var(--icon-only-size);
      padding: 0;
    `}
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 0.7s linear infinite;
`;
