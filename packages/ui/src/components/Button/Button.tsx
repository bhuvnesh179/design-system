import type { ComponentPropsWithRef, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Spinner,
  StyledButton,
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from './Button.styles';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  /** Renders a square button for a single icon passed as `children`. Pass an `aria-label`. */
  iconOnly?: boolean;
  /** Shows a spinner and blocks interaction. Submit buttons also enter this state automatically while their parent `<form action>` is pending. */
  loading?: boolean;
  /** Replaces the label while loading, e.g. `"Saving…"`. */
  loadingText?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  fullWidth = false,
  iconOnly = false,
  loading = false,
  loadingText,
  startIcon,
  endIcon,
  type = 'button',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  const isLoading = loading || (type === 'submit' && pending);
  // While loading, icon-only buttons swap their icon for the spinner instead of showing both.
  const label = isLoading && (iconOnly || loadingText) ? loadingText : children;

  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      $variant={variant}
      $size={size}
      $shape={shape}
      $fullWidth={fullWidth && !iconOnly}
      $iconOnly={iconOnly}
      {...props}
    >
      {isLoading ? <Spinner aria-hidden /> : startIcon}
      {label}
      {!isLoading && endIcon}
    </StyledButton>
  );
}
