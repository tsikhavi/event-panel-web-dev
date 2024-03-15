import React, { FC, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Menu, { MenuItemProps, MenuProps } from './Menu';

export default {
  component: Menu,
} as Meta<MenuProps>;

type Story = StoryObj<MenuProps>;

const MenuItemWithHook: FC<MenuItemProps> = ({ checked: initValue, ...other }) => {
  const [isCheck, setIsCheck] = useState(initValue);

  return <Menu.MenuItem {...other} checked={isCheck} onClick={() => setIsCheck((old) => !old)} />;
};

export const Default: Story = {
  render: (args) => (
    <>
      <Menu {...args}>
        <MenuItemWithHook label="Value Label" />
        <MenuItemWithHook label="Value Label" />
        <MenuItemWithHook checked label="I'm chosen one" />
        <MenuItemWithHook label="Value Label" />
      </Menu>

      <Menu {...args}>
        <MenuItemWithHook label="Value Label" subLabel="Sub Label" />
        <MenuItemWithHook label="Value Label" subLabel="Sub Label" />
        <MenuItemWithHook label="Value Label" subLabel="Sub Label" />
      </Menu>

      <Menu {...args}>
        <MenuItemWithHook checkbox label="Value Label" />
        <MenuItemWithHook checkbox checked label="I'm chosen one too" />
        <MenuItemWithHook checkbox label="Value Label" />
      </Menu>
    </>
  ),
};
