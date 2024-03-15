import React, { FC } from 'react';

import useStyles from './Loader.styles';

export type LoaderProps = {
  isLoading: boolean;
  testId?: string;
};

const Loader: FC<LoaderProps> = ({ isLoading, testId = 'loader' }) => {
  const { classes } = useStyles();

  if (!isLoading) return null;

  return (
    <div className={classes.root} data-testid={testId}>
      Loading...
    </div>
  );
};

export default Loader;
