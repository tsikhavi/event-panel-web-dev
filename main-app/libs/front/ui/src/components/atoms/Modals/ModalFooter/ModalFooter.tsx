import React, { FC } from 'react';

import Button from '../../Buttons/Button/Button';

import useStyles from './ModalFooter.styles';

export type ModalFooterProps = {
  submitLabel: string;
} & Partial<{
  CancelButton: JSX.Element;
}>;

const ModalFooter: FC<ModalFooterProps> = ({ submitLabel, CancelButton }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      {/*FIXME*/}
      <Button form={'sidemodal-form'} label={submitLabel} type={'submit'} />
      {CancelButton}
    </div>
  );
};

export default ModalFooter;
