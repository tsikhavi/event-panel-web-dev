import { Meta, StoryObj } from '@storybook/react';

import { getPropertiesList } from './__test-data__';
import PropertiesTable, { PropertiesTableProps } from './PropertiesTable';

export default {
  component: PropertiesTable,
} as Meta<PropertiesTableProps>;

type Story = StoryObj<PropertiesTableProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <PropertiesTable {...args} properties={getPropertiesList(4)} />
    </div>
  ),
};
