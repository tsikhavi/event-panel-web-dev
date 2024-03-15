import { Meta, StoryObj } from '@storybook/react';

import { menuItems } from '../ContextMenu/__test-data__';
import ContextMenu from '../ContextMenu/ContextMenu';

import Entity, { EntityProps } from './Entity';

export default {
  component: Entity,
  args: {
    name: 'Onboarding Screen Shown',
  },
  argTypes: {},
} as Meta<EntityProps>;

type Story = StoryObj<typeof Entity>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '450px' }}>
      <Entity {...args} ContextMenu={<ContextMenu items={menuItems} />} />
    </div>
  ),
};
