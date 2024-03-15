import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import TextArea, { TextAreaProps } from './TextArea';

export default {
  component: TextArea,
} as Meta<TextAreaProps>;

type Story = StoryObj<typeof TextArea>;

const TextAreaHook: FC<TextAreaProps> = () => {
  const [value, setValue] = useState<string>('');

  return <TextArea name={'textarea'} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => (
    <div>
      <TextAreaHook {...args} />
    </div>
  ),
};
