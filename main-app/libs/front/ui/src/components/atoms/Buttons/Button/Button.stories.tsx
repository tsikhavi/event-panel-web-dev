import type { Meta, StoryObj } from '@storybook/react';

import { Add, Google } from '../../../../assets/images';

import Button, { ButtonProps, Variants } from './Button';

export default {
  component: Button,
  args: {
    label: 'Button',
    variant: 'contained',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['contained', 'outlined', 'ghost'] as Variants[],
    },
    type: { control: false },
    label: { control: false },
    endIcon: { control: false },
    startIcon: { control: false },
    onClick: { control: false },
  },
} as Meta<ButtonProps>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <>
      <Button {...args} />
      <Button {...args} endIcon={Add} iconSize={'lg'} />
      <Button {...args} startIcon={Add} iconSize={'lg'} />
    </>
  ),
};

export const Auth: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'authorization',
    label: 'Sign in with Google',
    startIcon: Google,
    iconSize: 'lg',
    fullWidth: true,
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
};
