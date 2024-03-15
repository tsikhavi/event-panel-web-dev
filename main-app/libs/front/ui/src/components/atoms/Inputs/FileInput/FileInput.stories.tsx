import { Meta, StoryObj } from '@storybook/react';

import FileInput, { FileInputProps } from './FileInput';

export default {
  component: FileInput,
  args: {
    name: 'screenshot',
  },
  argTypes: {
    name: {
      control: false,
    },
  },
} as Meta<FileInputProps>;

type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  render: (args) => <FileInput {...args} />,
};
