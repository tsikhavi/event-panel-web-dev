import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import TextInput from '../TextInput/TextInput';

import Dropdown, { DropdownProps } from './Dropdown';

export default {
  component: Dropdown,
  args: {},
  argTypes: {},
} as Meta<DropdownProps>;

type Story = StoryObj<typeof Dropdown>;

const DropdownComponent: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  return (
    <Dropdown
      anchor={<TextInput value={value} onChange={setValue} onFocus={() => setIsOpen(true)} />}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      This is dropdown
    </Dropdown>
  );
};

export const Default: Story = {
  render: () => <DropdownComponent />,
};
