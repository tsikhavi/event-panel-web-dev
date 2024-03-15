import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import NavLink, { NavLinkProps } from './NavLink';

export default {
  component: NavLink,
} as Meta<NavLinkProps>;

type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <BrowserRouter>
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavLink to={'/page-1'} label={'Link to page 1'} />
          <NavLink to={'/page-2'} label={'Link to page 2'} />
          <NavLink to={'/page-3'} label={'Link to page 3'} />
        </div>
        <Routes>
          <Route path={'/page-1'} element={<div>Page 1</div>} />
          <Route path={'/page-2'} element={<div>Page 2</div>} />
          <Route path={'/page-3'} element={<div>Page 3</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  ),
};
