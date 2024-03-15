import { Meta, StoryObj } from '@storybook/react';

import { Add } from '../../../../assets/images';

import IconButton, { IconButtonProps } from './IconButton';

export default {
  component: IconButton,
  argTypes: {
    size: { control: false },
    icon: { control: false },
    className: { control: false },
    onClick: { control: false },
  },
} as Meta<IconButtonProps>;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => (
    <>
      <IconButton {...args} icon={Add} size="sm" />
      <IconButton {...args} icon={Add} size="md" />
      <IconButton {...args} icon={Add} size="lg" />
      <IconButton {...args} icon={Add} size="xl" />
    </>
  ),
};
