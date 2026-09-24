import type { Meta, StoryObj } from '@storybook/react-vite';
import { useActionState, useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from '../Button';
import { Input } from './Input';

function SearchIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    onChange: fn(),
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['outline', 'filled'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'ada@example.com');
    await expect(input).toHaveValue('ada@example.com');
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Filled: Story = { args: { variant: 'filled' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithHint: Story = { args: { hint: "We'll never share your email." } };

export const Required: Story = { args: { required: true, hint: 'Required field.' } };

export const WithError: Story = {
  args: { error: 'Enter a valid email address.', defaultValue: 'not-an-email' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('Enter a valid email address.');
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    type: 'text',
    placeholder: undefined,
    defaultValue: 'ada',
    success: 'Username is available.',
  },
};

export const WithIcons: Story = {
  args: { startIcon: <MailIcon /> },
};

export const WithAddons: Story = {
  args: {
    label: 'Website',
    type: 'text',
    placeholder: 'example',
    startAddon: 'https://',
    endAddon: '.com',
  },
};

export const Clearable: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search products',
    startIcon: <SearchIcon />,
    clearable: true,
    defaultValue: 'Running shoes',
    onClear: fn(),
  },
  play: async ({ args, canvas }) => {
    const input = canvas.getByLabelText('Search');
    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));
    await expect(input).toHaveValue('');
    await expect(input).toHaveFocus();
    await expect(args.onClear).toHaveBeenCalledOnce();
  },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: 'Enter password' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Password');
    await userEvent.type(input, 'hunter2');
    await userEvent.click(canvas.getByRole('button', { name: 'Show password' }));
    await expect(input).toHaveAttribute('type', 'text');
  },
};

export const CharacterCount: Story = {
  args: {
    label: 'Display name',
    type: 'text',
    placeholder: 'Ada Lovelace',
    showCount: true,
    maxLength: 24,
    hint: 'Shown on your public profile.',
  },
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText('Display name'), 'Ada');
    await expect(canvas.getByText('3/24')).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: {
    label: 'Username',
    type: 'text',
    placeholder: undefined,
    defaultValue: 'ada',
    loading: true,
    hint: 'Checking availability…',
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'ada@example.com' } };

export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'ada@example.com' } };

/** Validates as the user types; the parent owns the value and the error. */
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    const error = value && !value.includes('@') ? 'Enter a valid email address.' : undefined;
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        clearable
        error={error}
        success={value.includes('@') ? 'Looks good.' : undefined}
      />
    );
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'ada');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '@example.com');
    await expect(input).toHaveAccessibleDescription('Looks good.');
  },
};

interface SubscribeState {
  email?: string;
  error?: string;
}

/** Server-style validation using React 19's `useActionState`. */
export const WithActionState: Story = {
  render: function Render(args) {
    const [state, formAction] = useActionState<SubscribeState, FormData>(
      async (_prev, formData) => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const email = String(formData.get('email') ?? '');
        return email.includes('@') ? { email } : { email, error: 'Enter a valid email address.' };
      },
      {},
    );

    return (
      <form action={formAction} style={{ display: 'grid', gap: 12 }}>
        <Input {...args} name="email" defaultValue={state.email} error={state.error} />
        <Button type="submit">Subscribe</Button>
      </form>
    );
  },
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'nope');
    await userEvent.click(canvas.getByRole('button', { name: 'Subscribe' }));
    await expect(await canvas.findByText('Enter a valid email address.')).toBeInTheDocument();
  },
};
