import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { Spinner } from '../Button/Button.styles';
import { AlertIcon, CheckIcon, CloseIcon, EyeIcon, EyeOffIcon } from './icons';
import {
  Addon,
  Adornment,
  Control,
  Count,
  Field,
  HelperRow,
  HelperText,
  IconButton,
  Label,
  RequiredMark,
  StyledInput,
  type InputSize,
  type InputTone,
  type InputVariant,
} from './Input.styles';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  /** Visible label. Omit only when you pass `aria-label` or `aria-labelledby`. */
  label?: ReactNode;
  hint?: ReactNode;
  /** Marks the input invalid. A node is shown as the message (replacing `hint`); `true` only styles it. */
  error?: ReactNode;
  /** Marks the input valid. A node is shown as the message (replacing `hint`); `true` only styles it. Ignored while `error` is set. */
  success?: ReactNode;
  size?: InputSize;
  variant?: InputVariant;
  /** Decorative icon inside the field, before the text. */
  startIcon?: ReactNode;
  /** Decorative icon inside the field, after the text. */
  endIcon?: ReactNode;
  /** Attached segment before the field, e.g. `https://` or a currency. */
  startAddon?: ReactNode;
  /** Attached segment after the field, e.g. `.com` or `kg`. */
  endAddon?: ReactNode;
  /** Shows a clear button while the input has a value. Clearing fires `onChange` with an empty value, then `onClear`. */
  clearable?: boolean;
  onClear?: () => void;
  /** Shows a character counter, as `n/maxLength` when `maxLength` is set. */
  showCount?: boolean;
  /** Shows a spinner, e.g. while validating or searching. */
  loading?: boolean;
  /** Adds a show/hide button to `type="password"` inputs. Defaults to `true`. */
  passwordToggle?: boolean;
}

/** Sets an input's value the way a user edit would, so React fires `onChange` for controlled and uncontrolled inputs alike. */
function setNativeValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

const hasMessage = (node: ReactNode) =>
  node !== undefined && node !== null && typeof node !== 'boolean' && node !== '';

export function Input({
  label,
  hint,
  error,
  success,
  size = 'md',
  variant = 'outline',
  startIcon,
  endIcon,
  startAddon,
  endAddon,
  clearable = false,
  onClear,
  showCount = false,
  loading = false,
  passwordToggle = true,
  type = 'text',
  id: idProp,
  className,
  disabled = false,
  readOnly = false,
  required,
  maxLength,
  value,
  defaultValue,
  onChange,
  ref,
  'aria-describedby': ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const helperId = `${id}-helper`;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') return ref(node);
      if (ref) ref.current = node;
    },
    [ref],
  );

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() => String(defaultValue ?? ''));
  const currentValue = isControlled ? String(value ?? '') : uncontrolledValue;

  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';

  const invalid = Boolean(error);
  const valid = !invalid && Boolean(success);
  const tone: InputTone = invalid ? 'danger' : valid ? 'success' : 'neutral';
  const statusMessage = invalid ? error : valid ? success : undefined;
  const helper = hasMessage(statusMessage) ? statusMessage : hint;
  const helperTone: InputTone = hasMessage(statusMessage) ? tone : 'neutral';
  const describedBy = [ariaDescribedBy, hasMessage(helper) ? helperId : undefined]
    .filter(Boolean)
    .join(' ');

  const interactive = !disabled && !readOnly;
  const showClear = clearable && interactive && currentValue.length > 0;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setUncontrolledValue(event.target.value);
    onChange?.(event);
  }

  function handleClear() {
    const input = inputRef.current;
    if (!input) return;
    setNativeValue(input, '');
    onClear?.();
    input.focus();
  }

  return (
    <Field className={className}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <RequiredMark aria-hidden>*</RequiredMark>}
        </Label>
      )}

      <Control
        $size={size}
        $variant={variant}
        $tone={tone}
        $disabled={disabled}
        $readOnly={readOnly}
      >
        {startAddon && <Addon $position="start">{startAddon}</Addon>}
        {startIcon && <Adornment aria-hidden>{startIcon}</Adornment>}

        <StyledInput
          ref={setRefs}
          id={id}
          type={isPassword && revealed ? 'text' : type}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy || undefined}
          aria-busy={loading || undefined}
          {...props}
        />

        {showClear && (
          <IconButton type="button" aria-label="Clear" onClick={handleClear}>
            <CloseIcon />
          </IconButton>
        )}
        {loading ? (
          <Adornment aria-hidden>
            <Spinner />
          </Adornment>
        ) : (
          tone !== 'neutral' && (
            <Adornment $tone={tone} aria-hidden>
              {invalid ? <AlertIcon /> : <CheckIcon />}
            </Adornment>
          )
        )}
        {isPassword && passwordToggle && (
          <IconButton
            type="button"
            aria-label={revealed ? 'Hide password' : 'Show password'}
            aria-controls={id}
            disabled={disabled}
            onClick={() => setRevealed((r) => !r)}
          >
            {revealed ? <EyeOffIcon /> : <EyeIcon />}
          </IconButton>
        )}
        {endIcon && <Adornment aria-hidden>{endIcon}</Adornment>}
        {endAddon && <Addon $position="end">{endAddon}</Addon>}
      </Control>

      {(hasMessage(helper) || showCount) && (
        <HelperRow>
          {hasMessage(helper) && (
            <HelperText id={helperId} $tone={helperTone}>
              {helper}
            </HelperText>
          )}
          {showCount && (
            <Count $over={maxLength !== undefined && currentValue.length > maxLength}>
              {maxLength !== undefined
                ? `${currentValue.length}/${maxLength}`
                : currentValue.length}
            </Count>
          )}
        </HelperRow>
      )}
    </Field>
  );
}
