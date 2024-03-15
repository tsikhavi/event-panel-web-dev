import { Meta, StoryObj } from '@storybook/react';

import FilterButton, { FilterButtonProps } from './FilterButton';

export default {
  component: FilterButton,
  argTypes: {
    label: { control: false },
    onClick: { control: false },
    isActive: { control: false },
  },
} as Meta<FilterButtonProps>;

type Story = StoryObj<FilterButtonProps>;

export const Default: Story = {
  render: (args) => (
    <>
      <FilterButton {...args} label="I'm not Active" />
      <FilterButton {...args} isActive label="I'm Active" />
    </>
  ),
};
