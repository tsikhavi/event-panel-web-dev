import { Meta, StoryObj } from '@storybook/react';

import { menuItems } from './__test-data__';
import ContextMenu, { ContextMenuProps } from './ContextMenu';

export default {
  component: ContextMenu,
  args: {},
  argTypes: {},
} as Meta<ContextMenuProps>;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{}}>
        <ContextMenu items={menuItems} />
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        <ContextMenu items={menuItems} />
      </div>
    </div>
  ),
};
