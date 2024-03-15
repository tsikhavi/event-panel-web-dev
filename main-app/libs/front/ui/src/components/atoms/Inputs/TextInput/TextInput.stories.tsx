import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import TextInput, { TextInputProps, Types } from './TextInput';

export default {
  component: TextInput,
  args: {
    name: 'email',
    type: 'text',
    error: false,
    success: false,
    disabled: false,
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['text', 'password'] as Types[],
    },
    name: { control: false },
    value: { control: false },
  },
} as Meta<TextInputProps>;

type Story = StoryObj<typeof TextInput>;

const TextInputHook: FC<TextInputProps> = (props) => {
  const [value, setValue] = useState<string | null>(null);

  return <TextInput {...props} autoFocus value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => (
    <div>
      <TextInputHook {...args} />
    </div>
  ),
};
