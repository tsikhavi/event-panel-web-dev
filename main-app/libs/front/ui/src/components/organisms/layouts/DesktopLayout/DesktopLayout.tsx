import React, { FC } from 'react';

import useStyles from './DesktopLayout.styles';

export type DesktopLayoutProps = {
  children: React.ReactNode;
};

const DesktopLayout: FC<DesktopLayoutProps> = ({ children }) => {
  const { classes } = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default DesktopLayout;
