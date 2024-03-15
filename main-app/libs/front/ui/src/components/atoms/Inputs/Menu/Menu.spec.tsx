import React from 'react';

import { customRender, fireEvent } from '../../../../test-utils';

import Menu, { MenuItemProps } from './Menu';

const getMenuItemProps = (props: Partial<MenuItemProps> = {}): MenuItemProps => ({
  label: 'menu item',
  ...props,
});
const TestMenu = ({ menuItemsProps = {} }: { menuItemsProps?: Partial<MenuItemProps> }) => (
  <Menu>
    <Menu.MenuItem {...getMenuItemProps({ ...menuItemsProps })} />
  </Menu>
);

describe('Menu', () => {
  it('should render default', () => {
    const { label } = getMenuItemProps();
    const { getByText } = customRender(<TestMenu />);

    expect(getByText(label)).toBeInTheDocument();
  });

  it('should render selected MenuItem', () => {
    const { label } = getMenuItemProps();
    const { getByText } = customRender(<TestMenu menuItemsProps={getMenuItemProps({ checked: true })} />);

    expect(getByText(label).parentElement?.className).toContain('selected');
  });

  it('should call onClick', () => {
    const onClick = jest.fn();
    const { label } = getMenuItemProps();
    const { getByText } = customRender(<TestMenu menuItemsProps={getMenuItemProps({ onClick })} />);

    fireEvent.click(getByText(label));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each<[boolean, RegExp]>([
    [true, /checkboxOn/],
    [false, /checkboxOff/],
  ])('should render checkbox with checked: %s', (checked, icon) => {
    const { queryByText } = customRender(<TestMenu menuItemsProps={getMenuItemProps({ checked, checkbox: true })} />);

    expect(queryByText(icon)).toBeInTheDocument();
  });
});
