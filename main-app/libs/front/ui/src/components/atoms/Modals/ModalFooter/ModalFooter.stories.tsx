import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../Buttons/Button/Button';
import SideModal from '../SideModal/SideModal';

import ModalFooter, { ModalFooterProps } from './ModalFooter';

export default {
  component: ModalFooter,
} as Meta<ModalFooterProps>;

type Story = StoryObj<typeof ModalFooter>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <SideModal
        isOpen={true}
        onClose={() => {}}
        Footer={<ModalFooter submitLabel={'Create'} CancelButton={<Button variant={'ghost'} label={'Cancel'} />} />}
      >
        Modal
      </SideModal>
    </div>
  ),
};
