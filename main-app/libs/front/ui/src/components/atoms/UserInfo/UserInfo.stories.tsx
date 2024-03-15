import { Meta, StoryObj } from '@storybook/react';

import UserInfo, { UserInfoProps } from './UserInfo';

export default {
  component: UserInfo,
  args: {
    workspace: 'Workspace',
    email: 'elonmusk@google.com',
  },
  argTypes: {},
} as Meta<UserInfoProps>;

type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '260px' }}>
      <UserInfo
        {...args}
        actions={[
          {
            label: 'Switch workspace',
            onClick: () => {},
          },
          {
            label: 'Logout',
            onClick: () => {},
          },
        ]}
      />
    </div>
  ),
};
