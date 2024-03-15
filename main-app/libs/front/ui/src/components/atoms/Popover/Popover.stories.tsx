import React, { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Button from '../Buttons/Button/Button';

import Popover, { PopoverProps } from './Popover';

export default {
  component: Popover,
  argTypes: {
    isOpen: { control: false },
    anchor: { control: false },
    className: { control: false },
    onClose: { control: false },
  },
} as Meta<PopoverProps>;

const Paper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '12px',

      width: '300px',

      borderRadius: '12px',
      backgroundColor: '#F0F0F5',
      boxShadow: '0px 16px 24px 0px rgba(3, 4, 44, 0.12)',

      fontSize: `24px`,
    }}
  >
    {children}
  </div>
);

const DropdownToggle: FC<PopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Popover
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={<Button label="Toggle Dropdown" onClick={() => setIsOpen((old) => !old)} />}
      >
        <Paper>I'm a dropdown. You can place anything you want here.</Paper>
      </Popover>

      <Paper>Some other component, to display that dropdown works correct</Paper>
    </>
  );
};

type Story = StoryObj<PopoverProps>;

export const Default: Story = {
  render: (args) => <DropdownToggle {...args} />,
};
