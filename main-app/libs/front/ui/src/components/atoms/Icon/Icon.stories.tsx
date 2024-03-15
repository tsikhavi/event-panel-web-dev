import { Meta, StoryObj } from '@storybook/react';

import { Logout } from '../../../assets/images';

import Icon, { IconProps } from './Icon';

export default {
  component: Icon,
  args: {
    icon: Logout,
  },
  argTypes: {
    size: { control: false },
    icon: { control: false },
  },
} as Meta<IconProps>;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => (
    <>
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
      <Icon {...args} size="xl" />
    </>
  ),
};
