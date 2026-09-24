import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import { Button } from './Button';

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger', 'link'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Button' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Soft: Story = { args: { variant: 'soft' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } };

export const Link: Story = { args: { variant: 'link', children: 'Learn more' } };

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {(['primary', 'secondary', 'outline', 'soft', 'ghost', 'danger', 'link'] as const).map(
        (variant) => (
          <Button key={variant} {...args} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Pill: Story = { args: { shape: 'pill', children: 'Get started' } };

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} startIcon={<PlusIcon />}>
        New project
      </Button>
      <Button {...args} variant="secondary" endIcon={<ArrowRightIcon />}>
        Continue
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} iconOnly aria-label="Add item">
        <PlusIcon />
      </Button>
      <Button {...args} iconOnly variant="secondary" aria-label="Next">
        <ArrowRightIcon />
      </Button>
      <Button {...args} iconOnly variant="soft" shape="pill" aria-label="Add item">
        <PlusIcon />
      </Button>
      <Button {...args} iconOnly variant="ghost" aria-label="Delete">
        <TrashIcon />
      </Button>
    </div>
  ),
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const FullWidth: Story = { args: { fullWidth: true, children: 'Sign in' } };

export const Loading: Story = {
  args: { loading: true, children: 'Saving' },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Saving' });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingText: Story = {
  args: { loading: true, loadingText: 'Saving…', children: 'Save' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Saving…' })).toBeDisabled();
  },
};

export const Disabled: Story = { args: { disabled: true } };

/** Submit buttons read the parent form's pending state via React 19's `useFormStatus`. */
export const FormActionPending: Story = {
  args: { type: 'submit', children: 'Submit' },
  render: (args) => (
    <form
      action={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
    >
      <Button {...args} />
    </form>
  ),
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Submit' });
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute('aria-busy', 'true'));
    await waitFor(() => expect(button).not.toHaveAttribute('aria-busy'), { timeout: 3000 });
  },
};
