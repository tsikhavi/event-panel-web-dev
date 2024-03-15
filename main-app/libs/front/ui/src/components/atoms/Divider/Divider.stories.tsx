import { Meta, StoryObj } from '@storybook/react';

import Divider, { DividerProps } from './Divider';

export default {
  component: Divider,
  args: {
    label: 'OR',
  },
} as Meta<typeof Divider>;

type Story = StoryObj<DividerProps>;

export const Default: Story = {
  render: (args) => <Divider {...args} />,
};
