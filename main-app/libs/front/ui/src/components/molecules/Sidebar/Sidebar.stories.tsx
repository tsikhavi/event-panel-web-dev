import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import { Logout } from '../../../assets/images';
import Button from '../../atoms/Buttons/Button/Button';

import { navigations } from './__test-data__';
import Sidebar, { SidebarProps } from './Sidebar';

export default {
  component: Sidebar,
  args: {
    Footer: <Button label="Logout" variant="outlined" startIcon={Logout} />,
  },
  argTypes: {
    Footer: { control: false },
  },
} as Meta<SidebarProps>;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: (args) => (
    <BrowserRouter>
      <Sidebar {...args}>
        {navigations.map((items, index) => (
          <Sidebar.Nav key={index} items={items} />
        ))}
      </Sidebar>
    </BrowserRouter>
  ),
};
