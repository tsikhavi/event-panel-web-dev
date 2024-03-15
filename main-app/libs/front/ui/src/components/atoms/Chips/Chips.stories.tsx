import { Meta, StoryObj } from '@storybook/react';

import Chips, { ChipsProps } from './Chips';

export default {
  component: Chips,
  args: {
    label: 'Some Chips',
  },
  argTypes: {
    variant: { control: false },
  },
} as Meta<ChipsProps>;

type Story = StoryObj<typeof Chips>;

export const Default: Story = {
  render: (args) => (
    <>
      <Chips {...args} variant="active" />
      <Chips {...args} variant="default" />
      <Chips {...args} variant="disabled" />
    </>
  ),
};
