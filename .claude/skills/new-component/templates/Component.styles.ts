import styled, { css, type DefaultTheme, type RuleSet } from 'styled-components';

export type __Name__Variant = 'default' | 'subtle';
export type __Name__Size = 'sm' | 'md' | 'lg';

interface Styled__Name__Props {
  $variant: __Name__Variant;
  $size: __Name__Size;
}

const variantStyles: Record<__Name__Variant, (theme: DefaultTheme) => RuleSet> = {
  default: ({ colors }) => css`
    background: ${colors.bg};
    color: ${colors.fg};
    border-color: ${colors.border};
  `,
  subtle: ({ colors }) => css`
    background: ${colors.bgSubtle};
    color: ${colors.fgMuted};
  `,
};

const sizeStyles: Record<__Name__Size, (theme: DefaultTheme) => RuleSet> = {
  sm: ({ space, fontSizes }) => css`
    padding: ${space[2]};
    font-size: ${fontSizes.sm};
  `,
  md: ({ space, fontSizes }) => css`
    padding: ${space[3]};
    font-size: ${fontSizes.sm};
  `,
  lg: ({ space, fontSizes }) => css`
    padding: ${space[4]};
    font-size: ${fontSizes.md};
  `,
};

export const Styled__Name__ = styled.__element__<Styled__Name__Props>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;

  ${({ theme, $variant }) => variantStyles[$variant](theme)}
  ${({ theme, $size }) => sizeStyles[$size](theme)}
`;
