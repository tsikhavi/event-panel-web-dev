import React, { FC } from 'react';

import useStyles from './PageLayout.styles';

export type PageLayoutProps = {
  Header?: React.ReactNode;
  Content: React.ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ Header, Content }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      {Header && <div className={classes.header}>{Header}</div>}

      <div className={classes.content}>{Content}</div>
    </div>
  );
};

export default PageLayout;
