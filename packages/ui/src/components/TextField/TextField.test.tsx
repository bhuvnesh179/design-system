import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithTheme } from '../../test/render';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates the label with the input', () => {
    renderWithTheme(<TextField label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInstanceOf(HTMLInputElement);
  });

  it('describes the input with its hint', () => {
    renderWithTheme(<TextField label="Email" hint="Work email preferred" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Work email preferred');
  });

  it('marks the input invalid and shows the error instead of the hint', () => {
    renderWithTheme(<TextField label="Email" hint="Work email preferred" error="Required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Required');
    expect(screen.queryByText('Work email preferred')).not.toBeInTheDocument();
  });
});
