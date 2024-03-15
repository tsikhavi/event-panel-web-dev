import React, { FC } from 'react';

import useStyles from './Divider.styles';

export type DividerProps = {
  label?: string;
};

const Divider: FC<DividerProps> = ({ label }) => {
  const { classes } = useStyles();
  return <div className={classes['root']}>{label && <span className={classes['label']}>{label}</span>}</div>;
};

export default Divider;
