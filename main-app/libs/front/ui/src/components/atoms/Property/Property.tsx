import React, { FC } from 'react';

import Typography from '../Typography/Typography';

import useStyles from './Property.styles';

export type PropertyProps = {
  name: string;
  type: string;
} & Partial<{
  description?: string;
  ContextMenu: JSX.Element;
}>;

const Property: FC<PropertyProps> = ({ name, type, description, ContextMenu }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.name}>
            <Typography variant="bodyS">{name}</Typography>
          </div>

          <div className={classes.type}>
            <Typography variant="bodyS" color="secondary">
              {type}
            </Typography>
          </div>
        </div>

        <Typography className={classes.description} variant="bodyS">
          {description || 'No description'}
        </Typography>
      </div>

      {ContextMenu}
    </div>
  );
};

export default Property;
