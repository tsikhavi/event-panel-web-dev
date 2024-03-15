import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import { Logout } from '../../../../assets/images';
import Button from '../../../atoms/Buttons/Button/Button';
import { navigations } from '../../../molecules/Sidebar/__test-data__';

import SidebarLayout, { SidebarLayoutProps } from './SidebarLayout';

type SidebarLayoutWithHeightProps = SidebarLayoutProps & { height: number };

export default {
  component: SidebarLayout,
  args: {
    navigations,
    LogoutButton: <Button label="Logout" variant="outlined" startIcon={Logout} />,
    height: 500,
  },
  argTypes: {
    navigations: { control: false },
    LogoutButton: { control: false },
  },
} as Meta<SidebarLayoutWithHeightProps>;

type Story = StoryObj<SidebarLayoutWithHeightProps>;

export const Default: Story = {
  render: ({ height, ...args }) => (
    <BrowserRouter>
      <SidebarLayout {...args}>
        <div
          style={{
            height,
            flex: 1,
            padding: '30px',

            fontSize: '50px',
            textAlign: 'center',

            borderRadius: '24px',
            backgroundColor: '#FAFAFF',
            boxShadow: '0px 4px 8px 0px rgba(3, 4, 44, 0.08)',
          }}
        >
          Content with height: {height}px
        </div>
      </SidebarLayout>
    </BrowserRouter>
  ),
};
