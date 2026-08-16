import styled, { css, keyframes, type DefaultTheme, type RuleSet } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

const variantStyles: Record<ButtonVariant, (theme: DefaultTheme) => RuleSet> = {
  primary: ({ colors }) => css`
    background: ${colors.accent};
    color: ${colors.fgOnAccent};
    &:hover:not(:disabled) {
      background: ${colors.accentHover};
    }
    &:active:not(:disabled) {
      background: ${colors.accentActive};
    }
  `,
  secondary: ({ colors }) => css`
    background: ${colors.bg};
    color: ${colors.fg};
    border-color: ${colors.borderStrong};
    &:hover:not(:disabled) {
      background: ${colors.bgMuted};
    }
  `,
  ghost: ({ colors }) => css`
    background: transparent;
    color: ${colors.fg};
    &:hover:not(:disabled) {
      background: ${colors.bgMuted};
    }
  `,
  danger: ({ colors }) => css`
    background: ${colors.danger};
    color: ${colors.fgOnAccent};
    &:hover:not(:disabled) {
      background: ${colors.dangerHover};
    }
  `,
};

const sizeStyles: Record<ButtonSize, (theme: DefaultTheme) => RuleSet> = {
  sm: ({ space, fontSizes }) => css`
    height: 2rem;
    padding-inline: ${space[3]};
    font-size: ${fontSizes.sm};
  `,
  md: ({ space, fontSizes }) => css`
    height: 2.5rem;
    padding-inline: ${space[4]};
    font-size: ${fontSizes.sm};
  `,
  lg: ({ space, fontSizes }) => css`
    height: 3rem;
    padding-inline: ${space[6]};
    font-size: ${fontSizes.md};
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    background-color ${({ theme }) => theme.durations.fast} ease,
    border-color ${({ theme }) => theme.durations.fast} ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &[aria-busy='true'] {
    cursor: progress;
  }

  ${({ theme, $variant }) => variantStyles[$variant](theme)}
  ${({ theme, $size }) => sizeStyles[$size](theme)}
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 0.7s linear infinite;
`;
