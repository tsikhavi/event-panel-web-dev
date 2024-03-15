import { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Button from '../../Buttons/Button/Button';
import { menuItems } from '../../ContextMenu/__test-data__';
import ContextMenu from '../../ContextMenu/ContextMenu';
import ModalFooter from '../ModalFooter/ModalFooter';
import ModalHeader from '../ModalHeader/ModalHeader';

import SideModal, { SideModalProps } from './SideModal';

export default {
  component: SideModal,
} as Meta<SideModalProps>;

type Story = StoryObj<SideModalProps>;

const SideModalHook: FC<SideModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Toggle Side Modal" onClick={() => setIsOpen((old) => !old)} />
      <SideModal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        Header={<ModalHeader label={'Modal Header'} ContextMenu={<ContextMenu items={menuItems} />} />}
        Footer={
          <ModalFooter
            submitLabel={'Create'}
            CancelButton={<Button variant={'ghost'} label={'Cancel'} onClick={() => setIsOpen(false)} />}
          />
        }
      >
        Side modal
      </SideModal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <SideModalHook {...args} />,
};
