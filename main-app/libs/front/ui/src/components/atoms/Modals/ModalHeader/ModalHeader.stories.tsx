import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { menuItems } from '../../ContextMenu/__test-data__';
import ContextMenu from '../../ContextMenu/ContextMenu';
import SideModal from '../SideModal/SideModal';

import ModalHeader, { ModalHeaderProps } from './ModalHeader';

export default {
  args: {
    label: 'Modal Header',
  },
  component: ModalHeader,
} as Meta<ModalHeaderProps>;

type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <SideModal
        isOpen={true}
        onClose={() => {}}
        Header={<ModalHeader {...args} ContextMenu={<ContextMenu items={menuItems} />} />}
      >
        Modal
      </SideModal>
    </div>
  ),
};
