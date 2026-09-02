import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { __Name__ } from './__Name__';

const meta = {
  title: 'Components/__Name__',
  component: __Name__,
  tags: ['autodocs'],
  args: {
    children: '__Name__',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'subtle'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof __Name__>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('__Name__')).toBeVisible();
  },
};

export const Subtle: Story = { args: { variant: 'subtle' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <__Name__ {...args} size="sm" />
      <__Name__ {...args} size="md" />
      <__Name__ {...args} size="lg" />
    </div>
  ),
};
