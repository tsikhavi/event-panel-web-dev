import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Typography from '../Typography/Typography';

import AuthGroup, { AuthGroupProps } from './AuthGroup';

export default {
  component: AuthGroup,
} as Meta<AuthGroupProps>;

type Story = StoryObj<typeof AuthGroup>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <AuthGroup>
        <Typography centerAlign variant="h2">
          Sign In
        </Typography>
        <Typography centerAlign variant="bodyS">
          Please enter your details to sign in
        </Typography>
      </AuthGroup>
    </div>
  ),
};
