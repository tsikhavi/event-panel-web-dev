import React, { FC } from 'react';

import useStyles from './Label.styles';

export type LabelProps = {
  label: string;
};

const Label: FC<LabelProps> = ({ label }) => {
  const { classes } = useStyles();
  return <div className={classes.root}>{label}</div>;
};

export default Label;
