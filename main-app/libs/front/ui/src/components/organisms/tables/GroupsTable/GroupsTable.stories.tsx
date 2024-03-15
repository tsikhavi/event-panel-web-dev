import { Meta, StoryObj } from '@storybook/react';

import { getGroups } from './__test-data__';
import GroupsTable, { GroupsTableProps } from './GroupsTable';

export default {
  component: GroupsTable,
} as Meta<GroupsTableProps>;

type Story = StoryObj<GroupsTableProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <GroupsTable {...args} groups={getGroups(4)} />
    </div>
  ),
};
