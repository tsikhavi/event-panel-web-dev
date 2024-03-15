import React from 'react';

import Icon from '../../atoms/Icon/Icon';
import Logo from '../../atoms/Logo/Logo';
import NavLink from '../../atoms/NavLink/NavLink';

import useStyles from './Sidebar.styles';
import SidebarProvider from './SidebarProvider';

type SidebarNavCommonProps = {
  label: string;
};

type SideBarNavHeadProps = {
  variant: 'head';
  icon: React.FunctionComponent;
  path?: never;
};

type SideBarNavItemProps = {
  path: string;
  variant: 'item';
  icon?: never;
  onNavigate?: (path: string) => void;
};

export type SidebarNavItems = Array<SidebarNavCommonProps & (SideBarNavHeadProps | SideBarNavItemProps)>;

type SidebarNavProps = {
  items: SidebarNavItems;
  onNavigate?: (path: string) => void;
};

type SidebarComposition = {
  Nav: (props: SidebarNavProps) => JSX.Element;
};

export type SidebarProps = {
  children: JSX.Element | JSX.Element[];
  Footer: React.ReactNode;
};

type SidebarWrapper = (props: SidebarProps) => JSX.Element;

const Sidebar: SidebarWrapper & SidebarComposition = ({ children, Footer }) => {
  const { classes } = useStyles();

  return (
    <SidebarProvider>
      <div className={classes.root}>
        <Logo invert />
        <nav className={classes.navigation}>{children}</nav>
        <div>{Footer}</div>
      </div>
    </SidebarProvider>
  );
};

const Head = ({ label, icon }: SidebarNavCommonProps & SideBarNavHeadProps) => {
  const { classes, cx } = useStyles();

  return (
    <li className={cx(classes.head)}>
      {icon && <Icon size="lg" icon={icon} />}
      <span className={cx(classes.head_title)}>{label}</span>
    </li>
  );
};

const Nav = ({ items }: SidebarNavProps) => {
  const { classes } = useStyles();

  return (
    <ul className={classes.list}>
      {items.map(({ path, label, variant, icon }, index) =>
        variant === 'head' ? (
          <Head key={index} label={label} icon={icon} variant={'head'} />
        ) : (
          <li key={index}>
            <NavLink to={path} label={label} />
          </li>
        )
      )}
    </ul>
  );
};

Sidebar.Nav = Nav;

export default Sidebar;
