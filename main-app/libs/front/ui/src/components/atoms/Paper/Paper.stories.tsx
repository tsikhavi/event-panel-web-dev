import { Meta, StoryObj } from '@storybook/react';

import Paper, { PaperProps } from './Paper';

export default {
  component: Paper,
} as Meta<PaperProps>;

type Story = StoryObj<PaperProps>;

export const Default: Story = {
  render: (args) => <Paper {...args}>I'm a Paper.</Paper>,
};
