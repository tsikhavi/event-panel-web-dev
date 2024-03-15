import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import DesktopLayout, { DesktopLayoutProps } from './DesktopLayout';

export default {
  component: DesktopLayout,
} as Meta<DesktopLayoutProps>;

type Story = StoryObj<DesktopLayoutProps>;

export const Default: Story = {
  render: (args) => (
    <DesktopLayout {...args}>
      <div
        style={{
          width: '100%',
          padding: '24px',

          flex: 1,

          borderRadius: '24px',
          backgroundColor: '#F0F0F5',

          textAlign: 'center',
          fontSize: '24px',
        }}
      >
        I'm Desktop Layout Container
      </div>
    </DesktopLayout>
  ),
};
