import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithTheme } from '../../test/render';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input', () => {
    renderWithTheme(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInstanceOf(HTMLInputElement);
  });

  it('describes the input with its hint', () => {
    renderWithTheme(<Input label="Email" hint="Work email preferred" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Work email preferred');
  });

  it('marks the input invalid and shows the error instead of the hint', () => {
    renderWithTheme(<Input label="Email" hint="Work email preferred" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Required');
    expect(screen.queryByText('Work email preferred')).not.toBeInTheDocument();
  });

  it('keeps the hint when error is a boolean', () => {
    renderWithTheme(<Input label="Email" hint="Work email preferred" error />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Work email preferred');
  });

  it('shows the success message when there is no error', () => {
    renderWithTheme(<Input label="Username" success="Username is available" />);
    const input = screen.getByLabelText('Username');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).toHaveAccessibleDescription('Username is available');
  });

  it('clears an uncontrolled value and calls onChange and onClear', async () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    renderWithTheme(
      <Input label="Search" clearable defaultValue="shoes" onChange={onChange} onClear={onClear} />,
    );
    const input = screen.getByLabelText('Search');
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(onChange).toHaveBeenCalledOnce();
    expect(onClear).toHaveBeenCalledOnce();
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('clears a controlled value through onChange', async () => {
    function Controlled() {
      const [value, setValue] = useState('shoes');
      return (
        <Input label="Search" clearable value={value} onChange={(e) => setValue(e.target.value)} />
      );
    }
    renderWithTheme(<Controlled />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByLabelText('Search')).toHaveValue('');
  });

  it('toggles password visibility', async () => {
    renderWithTheme(<Input label="Password" type="password" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');
    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('counts characters against maxLength', async () => {
    renderWithTheme(<Input label="Bio" showCount maxLength={20} />);
    expect(screen.getByText('0/20')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Bio'), 'Hello');
    expect(screen.getByText('5/20')).toBeInTheDocument();
  });

  it('marks the input busy while loading', () => {
    renderWithTheme(<Input label="Username" loading />);
    expect(screen.getByLabelText('Username')).toHaveAttribute('aria-busy', 'true');
  });

  it('hides the clear button when disabled or read-only', () => {
    renderWithTheme(
      <>
        <Input label="A" clearable defaultValue="x" disabled />
        <Input label="B" clearable defaultValue="x" readOnly />
      </>,
    );
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('renders addons', () => {
    renderWithTheme(<Input label="Website" startAddon="https://" endAddon=".com" />);
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByText('.com')).toBeInTheDocument();
  });

  it('forwards ref as a regular prop', () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<Input label="Email" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
