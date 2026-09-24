import styled, { css, type DefaultTheme, type RuleSet } from 'styled-components';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled';
export type InputTone = 'neutral' | 'danger' | 'success';

interface ControlProps {
  $size: InputSize;
  $variant: InputVariant;
  $tone: InputTone;
  $disabled: boolean;
  $readOnly: boolean;
}

const toneColor = (theme: DefaultTheme, tone: InputTone) =>
  tone === 'danger'
    ? theme.colors.danger
    : tone === 'success'
      ? theme.colors.success
      : theme.colors.focusRing;

/** A translucent version of a theme color, used for the soft focus halo. */
const halo = (color: string) => `color-mix(in srgb, ${color} 22%, transparent)`;

const sizeStyles: Record<InputSize, (theme: DefaultTheme) => RuleSet> = {
  sm: ({ space, fontSizes }) => css`
    height: 2rem;
    padding-inline: ${space[2]};
    font-size: ${fontSizes.sm};
    --addon-offset: ${space[2]};
  `,
  md: ({ space, fontSizes }) => css`
    height: 2.5rem;
    padding-inline: ${space[3]};
    font-size: ${fontSizes.sm};
    --addon-offset: ${space[3]};
  `,
  lg: ({ space, fontSizes }) => css`
    height: 3rem;
    padding-inline: ${space[4]};
    font-size: ${fontSizes.md};
    --addon-offset: ${space[4]};
  `,
};

const variantStyles: Record<InputVariant, (theme: DefaultTheme) => RuleSet> = {
  outline: ({ colors }) => css`
    background: ${colors.bg};
    border-color: ${colors.borderStrong};
  `,
  filled: ({ colors }) => css`
    background: ${colors.bgMuted};
    border-color: transparent;
    &:focus-within {
      background: ${colors.bg};
    }
  `,
};

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  min-width: 0;
`;

export const Label = styled.label`
  display: inline-flex;
  gap: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.fg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

export const Control = styled.div<ControlProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.fg};
  transition:
    border-color ${({ theme }) => theme.durations.fast} ease,
    background-color ${({ theme }) => theme.durations.fast} ease,
    box-shadow ${({ theme }) => theme.durations.normal} ease;

  ${({ theme, $variant }) => variantStyles[$variant](theme)}
  ${({ theme, $size }) => sizeStyles[$size](theme)}

  &:hover {
    border-color: ${({ theme }) => theme.colors.fgMuted};
  }

  ${({ theme, $tone }) =>
    $tone !== 'neutral' &&
    css`
      &,
      &:hover {
        border-color: ${toneColor(theme, $tone)};
      }
    `}

  &:focus-within {
    border-color: ${({ theme, $tone }) => toneColor(theme, $tone)};
    box-shadow: 0 0 0 3px ${({ theme, $tone }) => halo(toneColor(theme, $tone))};
  }

  ${({ theme, $readOnly }) =>
    $readOnly &&
    css`
      background: ${theme.colors.bgSubtle};
    `}

  ${({ theme, $disabled }) =>
    $disabled &&
    css`
      &,
      &:hover {
        cursor: not-allowed;
        opacity: 0.6;
        background: ${theme.colors.bgMuted};
        border-color: ${theme.colors.border};
      }
    `}
`;

export const StyledInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.fgMuted};
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* Hide the native search/clear and password reveal controls; the component provides its own. */
  &::-webkit-search-cancel-button {
    display: none;
  }
  &::-ms-reveal {
    display: none;
  }
`;

export const Adornment = styled.span<{ $tone?: InputTone }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme, $tone = 'neutral' }) =>
    $tone === 'neutral' ? theme.colors.fgMuted : toneColor(theme, $tone)};
  font-size: 1.1em;
`;

export const Addon = styled.span<{ $position: 'start' | 'end' }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  align-self: stretch;
  padding-inline: ${({ theme }) => theme.space[3]};
  background: ${({ theme }) => theme.colors.bgSubtle};
  color: ${({ theme }) => theme.colors.fgMuted};
  white-space: nowrap;

  ${({ theme, $position }) =>
    $position === 'start'
      ? css`
          margin-inline-start: calc(var(--addon-offset) * -1);
          border-inline-end: 1px solid ${theme.colors.border};
          border-start-start-radius: inherit;
          border-end-start-radius: inherit;
        `
      : css`
          margin-inline-end: calc(var(--addon-offset) * -1);
          border-inline-start: 1px solid ${theme.colors.border};
          border-start-end-radius: inherit;
          border-end-end-radius: inherit;
        `}
`;

export const IconButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.75em;
  height: 1.75em;
  margin-inline: -0.25em;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.fgMuted};
  font-size: inherit;
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.durations.fast} ease,
    color ${({ theme }) => theme.durations.fast} ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgMuted};
    color: ${({ theme }) => theme.colors.fg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 1px;
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    font-size: 1.1em;
  }
`;

export const HelperRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const HelperText = styled.p<{ $tone: InputTone }>`
  margin: 0;
  color: ${({ theme, $tone }) =>
    $tone === 'neutral' ? theme.colors.fgMuted : toneColor(theme, $tone)};
`;

export const Count = styled.span<{ $over: boolean }>`
  flex-shrink: 0;
  margin-inline-start: auto;
  color: ${({ theme, $over }) => ($over ? theme.colors.danger : theme.colors.fgMuted)};
  font-variant-numeric: tabular-nums;
`;
