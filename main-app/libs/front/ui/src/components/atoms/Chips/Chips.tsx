import React, { FC } from 'react';

import useStyles from './Chips.styles';

export type Variants = 'default' | 'disabled' | 'active';

export type ChipsProps = {
  label: string;
  variant?: Variants;
};

const Chips: FC<ChipsProps> = ({ label, variant = 'default' }) => {
  const { classes, cx } = useStyles();

  return <div className={cx(classes.root, classes[variant])}>{label}</div>;
};

export default Chips;
