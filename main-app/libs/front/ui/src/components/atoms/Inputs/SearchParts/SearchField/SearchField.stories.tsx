import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import SearchField, { SearchFieldProps } from './SearchField';

export default {
  component: SearchField,
  args: {
    withFocus: true,
    fullWidth: false,
  },
  argTypes: {
    withFocus: { control: 'boolean' },
    fullWidth: { control: 'boolean' },

    onSearch: { control: false },
    onKeyDown: { control: false },
  },
} as Meta<SearchFieldProps>;

type Story = StoryObj<typeof SearchField>;

const SearchWithHook: FC<SearchFieldProps> = (props) => {
  const [value, setValue] = useState('');

  return <SearchField {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <SearchWithHook {...args} />,
};
