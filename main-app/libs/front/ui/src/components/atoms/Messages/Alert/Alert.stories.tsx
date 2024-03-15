import type { Meta, StoryObj } from '@storybook/react';

import Alert, { AlertProps } from './Alert';

export default {
  component: Alert,
  args: {
    header: 'Hello, Event Panel!',
    message: 'This is the Alert component!',
    closeButton: true,
  },
  argTypes: {
    closeButton: { control: { type: 'boolean' } },

    variant: { control: false },
    className: { control: false },
  },
} as Meta<AlertProps>;

type Story = StoryObj<AlertProps>;

export const Default: Story = {
  render: (args) => (
    <>
      <Alert {...args} variant="info" />
      <Alert {...args} variant="error" />
      <Alert {...args} variant="success" />
    </>
  ),
};
