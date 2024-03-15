import React, { FC } from 'react';

import Typography from '../../Typography/Typography';

import useStyles from './ModalHeader.styles';

export type ModalHeaderProps = {
  label?: string;
  ContextMenu?: React.ReactElement;
};

const ModalHeader: FC<ModalHeaderProps> = ({ label, ContextMenu }) => {
  const { classes } = useStyles({ hasLabel: Boolean(label) });
  return (
    <div className={classes.root}>
      {label && <Typography variant="bodyS">{label}</Typography>}
      {ContextMenu}
    </div>
  );
};

export default ModalHeader;
