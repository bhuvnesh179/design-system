import type { Meta, StoryObj } from '@storybook/react-vite';
import { useActionState } from 'react';
import { expect, userEvent } from 'storybook/test';
import { Button } from '../Button';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'ada@example.com');
    await expect(input).toHaveValue('ada@example.com');
  },
};

export const WithHint: Story = {
  args: { hint: "We'll never share your email." },
};

export const WithError: Story = {
  args: { error: 'Enter a valid email address.', defaultValue: 'not-an-email' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('Enter a valid email address.');
  },
};

export const Disabled: Story = { args: { disabled: true } };

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
        <TextField {...args} name="email" defaultValue={state.email} error={state.error} />
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
