import { Meta, StoryObj } from '@storybook/react';

import Label, { LabelProps } from './Label';

export default {
  component: Label,
  args: {
    label: 'Label',
  },
  argTypes: {},
} as Meta<LabelProps>;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => <Label {...args} />,
};
