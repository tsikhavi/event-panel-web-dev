import { Meta, StoryObj } from '@storybook/react';

import PageHeader, { PageHeaderProps } from './PageHeader';

export default {
  component: PageHeader,
} as Meta<PageHeaderProps>;

type Story = StoryObj<PageHeaderProps>;

export const Default: Story = {
  render: (args) => (
    <PageHeader
      {...args}
      header="Base Header"
      Actions="Place for Actions"
      Search="Place for Search Field"
      Filters="Place for Filters"
    />
  ),
};
