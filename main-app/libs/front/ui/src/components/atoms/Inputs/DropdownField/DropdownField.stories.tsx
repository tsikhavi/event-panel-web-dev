import { Meta, StoryObj } from '@storybook/react';

import DropdownField, { DropdownFieldProps } from './DropdownField';

export default {
  component: DropdownField,
  args: {
    label: 'Label',
  },
  argTypes: {},
} as Meta<DropdownFieldProps>;

type Story = StoryObj<typeof DropdownField>;

export const Default: Story = {
  render: () => <DropdownField value={'asd'} onChange={() => {}} />,
};
