import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  component: Checkbox,
  argTypes: {
    label: { control: false },
    isCheck: { control: false },
    onChange: { control: false },
  },
} as Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

const CheckboxWithHook: FC<CheckboxProps> = (props) => {
  const [checked, setChecked] = useState(true);

  return <Checkbox {...props} checked={checked} onChange={() => setChecked((old) => !old)} />;
};

export const Default: Story = {
  render: (args) => <CheckboxWithHook {...args} label="I'm a checkbox" />,
};
