import React, { FC } from 'react';

import Typography from '../Typography/Typography';

import useStyles from './Entity.styles';

export type EntityProps = {
  name: string;
} & Partial<{
  ContextMenu: JSX.Element;
}>;

const Entity: FC<EntityProps> = ({ name, ContextMenu }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="bodyS" color="primary">
        {name}
      </Typography>
      {ContextMenu}
    </div>
  );
};

export default Entity;
