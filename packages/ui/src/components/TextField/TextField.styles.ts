import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.fg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const HelperText = styled.p<{ $invalid?: boolean }>`
  margin: 0;
  color: ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.fgMuted)};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

export const StyledInput = styled.input`
  height: 2.5rem;
  padding-inline: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.fg};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: border-color ${({ theme }) => theme.durations.fast} ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.fgMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 1px;
    border-color: ${({ theme }) => theme.colors.focusRing};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.bgMuted};
    opacity: 0.7;
  }
`;
