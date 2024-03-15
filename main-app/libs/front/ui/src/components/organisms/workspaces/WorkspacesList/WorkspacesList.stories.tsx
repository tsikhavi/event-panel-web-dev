import { Meta, StoryObj } from '@storybook/react';

import WorkspacesList, { WorkspacesListProps } from './WorkspacesList';

export default {
  component: WorkspacesList,
} as Meta<WorkspacesListProps>;

type Story = StoryObj<WorkspacesListProps>;

export const Default: Story = {
  render: (args) => (
    <WorkspacesList {...args}>
      <WorkspacesList.Item>Workspace Name 1</WorkspacesList.Item>
      <WorkspacesList.Item>Workspace Name 2</WorkspacesList.Item>
      <WorkspacesList.Item>Workspace Name 3</WorkspacesList.Item>
    </WorkspacesList>
  ),
};
