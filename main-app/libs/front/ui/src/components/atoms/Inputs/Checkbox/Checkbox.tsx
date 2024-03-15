import React, { FC } from 'react';

import { CheckboxOff, CheckboxOn } from '../../../../assets/images';
import Icon from '../../Icon/Icon';

import useStyles from './Checkbox.styles';

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange?: () => void;
};

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div onClick={() => onChange?.()}>
        {checked ? (
          <Icon icon={CheckboxOn} className={classes.checkboxOn} />
        ) : (
          <Icon icon={CheckboxOff} className={classes.checkboxOff} />
        )}
      </div>
      <label className={classes.root}>
        <input type="checkbox" checked={checked} className={classes.checkbox} onChange={() => onChange?.()} />
        <span className={classes.label}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
