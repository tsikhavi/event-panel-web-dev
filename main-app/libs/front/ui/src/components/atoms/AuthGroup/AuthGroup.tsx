import React, { FC } from 'react';

import useStyles from './AuthGroup.styles';

export type AuthGroupProps = {
  children: React.ReactNode;
};

const AuthGroup: FC<AuthGroupProps> = ({ children }) => {
  const { classes } = useStyles();
  return <div className={classes['root']}>{children}</div>;
};

export default AuthGroup;
