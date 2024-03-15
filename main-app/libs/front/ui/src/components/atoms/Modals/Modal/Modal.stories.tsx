import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Button from '../../Buttons/Button/Button';

import Modal, { ModalContainerProps } from './Modal';

export default {
  component: Modal,
  args: {
    isOpen: true,
  },
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} as Meta<ModalContainerProps>;

type Story = StoryObj<ModalContainerProps>;

const ModalContainerHook: FC<ModalContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Toggle Modal" onClick={() => setIsOpen(true)} />
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: ({ ...args }) => (
    <ModalContainerHook {...args}>
      <div
        style={{
          minWidth: '400px',
          height: '300px',
          padding: '24px',

          backgroundColor: '#FFFFFF',
        }}
      >
        Modal
      </div>
    </ModalContainerHook>
  ),
};
