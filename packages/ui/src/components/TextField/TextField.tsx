import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { Field, HelperText, Label, StyledInput } from './TextField.styles';

export interface TextFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label: ReactNode;
  hint?: ReactNode;
  /** Error message. When set, the input is marked invalid and the message replaces the hint. */
  error?: ReactNode;
}

export function TextField({
  label,
  hint,
  error,
  id: idProp,
  className,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const helperId = `${id}-helper`;
  const helper = error ?? hint;
  const describedBy = [ariaDescribedBy, helper ? helperId : undefined].filter(Boolean).join(' ');

  return (
    <Field className={className}>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {helper && (
        <HelperText id={helperId} $invalid={Boolean(error)}>
          {helper}
        </HelperText>
      )}
    </Field>
  );
}
