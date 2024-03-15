import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Filter, { FilterProps } from './Filter';

export default {
  component: Filter,
  args: {
    withSearch: true,
    label: 'Some Label',
    value: ['1', '2', '4'],
    options: {
      '1': { id: '1', label: 'Label 1' },
      '2': { id: '2', label: 'Label 2' },
      '3': { id: '3', label: 'Label 3' },
      '4': { id: '4', label: 'This Label 4 is too long with to many words' },
      '5': { id: '5', label: 'Label 5' },
    },
  },
  argTypes: {
    withSearch: { control: 'boolean' },

    onChange: { control: false },
  },
} as Meta<FilterProps>;

type Story = StoryObj<FilterProps>;

const FilterWithHook: FC<FilterProps> = ({ value: initValue, ...props }) => {
  const [value, setValue] = useState<string[]>(initValue);

  return <Filter {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <FilterWithHook {...args} />,
};
