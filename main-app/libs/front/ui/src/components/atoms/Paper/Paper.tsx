import React, { FC } from 'react';

import useStyles from './Paper.styles';

export type PaperProps = {
  children: React.ReactNode;
  className?: string;
};

const Paper: FC<PaperProps> = ({ children, className }) => {
  const { classes, cx } = useStyles();

  return <div className={cx(classes.root, className)}>{children}</div>;
};

export default Paper;
