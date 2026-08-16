import type { ComponentPropsWithRef, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Spinner, StyledButton, type ButtonSize, type ButtonVariant } from './Button.styles';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Shows a spinner and blocks interaction. Submit buttons also enter this state automatically while their parent `<form action>` is pending. */
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  type = 'button',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  const isLoading = loading || (type === 'submit' && pending);

  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {isLoading ? <Spinner aria-hidden /> : startIcon}
      {children}
      {!isLoading && endIcon}
    </StyledButton>
  );
}
