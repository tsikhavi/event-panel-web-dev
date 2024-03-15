import { Meta, StoryObj } from '@storybook/react';

import AuthLayout, { AuthLayoutProps } from './AuthLayout';

export default {
  component: AuthLayout,
} as Meta<AuthLayoutProps>;

type Story = StoryObj<AuthLayoutProps>;

export const Default: Story = {
  render: (args) => (
    <AuthLayout {...args}>
      <div style={{ textAlign: 'center' }}>Form Content</div>
    </AuthLayout>
  ),
};
