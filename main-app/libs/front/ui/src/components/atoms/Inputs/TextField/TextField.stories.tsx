import React, { FC, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextField, { TextFieldProps } from './TextField';

export default {
  component: TextField,
  args: {
    value: 'mail@gmail.com',
  },
  argTypes: {
    name: { control: false },
    value: { control: false },
    label: { control: false },
    type: { control: false },
    testId: { control: false },
    onBlur: { control: false },
    onChange: { control: false },
    autoFocus: { control: false },
  },
} as Meta<TextFieldProps>;

type Story = StoryObj<typeof TextField>;

const TextFieldHook: FC<TextFieldProps> = ({ value: initValue, ...props }) => {
  const [value, setValue] = useState<string | null>(initValue);

  return <TextField {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '250px' }}>
      <TextFieldHook {...args} autoFocus type="text" value="without label" />
      <TextFieldHook {...args} label="E-Mail" type="email" value="mail@mail.com" />
      <TextFieldHook {...args} label="Password" type="password" value="mail@mail.com" />
      <TextFieldHook {...args} label="Textarea" value="Very long message about my project" textArea />
    </div>
  ),
};
