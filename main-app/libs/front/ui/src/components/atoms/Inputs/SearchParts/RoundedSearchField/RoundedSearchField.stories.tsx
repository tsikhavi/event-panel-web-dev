import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import RoundedSearchField, { SearchFieldProps } from './RoundedSearchField';

export default {
  component: RoundedSearchField,
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

type Story = StoryObj<typeof RoundedSearchField>;

const SearchWithHook: FC<SearchFieldProps> = (props) => {
  const [value, setValue] = useState('');

  return <RoundedSearchField {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <SearchWithHook {...args} />,
};
