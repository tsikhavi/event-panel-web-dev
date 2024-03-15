import React, { FC } from 'react';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

import useStyles from './NavLink.styles';

export type NavLinkProps = {
  label: string;
} & RouterNavLinkProps;

const NavLink: FC<NavLinkProps> = ({ to, label }) => {
  const { classes, cx } = useStyles();
  return (
    <RouterNavLink className={({ isActive }) => (!isActive ? classes.root : cx(classes.root, classes.active))} to={to}>
      {label}
    </RouterNavLink>
  );
};

export default NavLink;
