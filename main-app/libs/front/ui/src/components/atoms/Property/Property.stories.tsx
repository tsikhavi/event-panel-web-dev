import { Meta, StoryObj } from '@storybook/react';

import { menuItems } from '../ContextMenu/__test-data__';
import ContextMenu from '../ContextMenu/ContextMenu';

import Property, { PropertyProps } from './Property';

export default {
  component: Property,
  args: {
    name: 'city_id',
    type: 'Integer',
    description: '',
  },
  argTypes: {},
} as Meta<PropertyProps>;

type Story = StoryObj<typeof Property>;

export const Default: Story = {
  render: (args) => (
    <>
      <div style={{ width: '400px' }}>
        <Property {...args} ContextMenu={<ContextMenu items={menuItems} />} />
      </div>
      <div style={{ width: '400px' }}>
        <Property {...args} ContextMenu={<ContextMenu items={menuItems} />} />
        <Property {...args} ContextMenu={<ContextMenu items={menuItems} />} />
      </div>
      <div style={{ width: '400px' }}>
        <Property {...args} ContextMenu={<ContextMenu items={menuItems} />} />
        <Property {...args} ContextMenu={<ContextMenu items={menuItems} />} />
        <Property {...args} ContextMenu={<ContextMenu items={menuItems} />} />
      </div>
    </>
  ),
};
