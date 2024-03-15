import React, { FC } from 'react';

import useStyles from './ButtonGroup.styles';

export type ButtonGroupProps = {
  children: React.ReactNode;
};

const ButtonGroup: FC<ButtonGroupProps> = ({ children }) => {
  const { classes } = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default ButtonGroup;
