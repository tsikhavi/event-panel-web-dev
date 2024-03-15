import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useStyles } from './Link.styles';

export type LinkProps = {
  to: string;
  children: React.ReactNode;
};

const Link: React.FC<LinkProps> = ({ to, children }) => {
  const { classes } = useStyles();

  return (
    <RouterLink to={to} className={classes.root}>
      {children}
    </RouterLink>
  );
};

export default Link;
