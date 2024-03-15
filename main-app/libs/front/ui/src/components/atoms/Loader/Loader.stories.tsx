import type { Meta, StoryObj } from '@storybook/react';

import Loader, { LoaderProps } from './Loader';

export default {
  component: Loader,
  args: {
    isLoading: true,
  },
  argTypes: {
    testId: { control: false },
  },
} as Meta<LoaderProps>;

type Story = StoryObj<LoaderProps>;

export const Default: Story = {};
