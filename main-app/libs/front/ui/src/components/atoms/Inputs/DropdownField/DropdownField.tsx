import React, { forwardRef } from 'react';

import TextInput from '../TextInput/TextInput';

import useStyles from './DropdownField.styles';

export type DropdownFieldProps = {
  value: string;
  onChange: (str: string) => void;
} & Partial<{
  name: string;
  className: string;
  placeholder: string;
  onFocus: () => void;
  onClick: (event: React.MouseEvent) => void;
  disabled: boolean;
  iconStart: JSX.Element;
  iconEnd: JSX.Element;
  isActive: boolean;
  readOnly: boolean;
}>;

const DropdownField = forwardRef<HTMLInputElement, DropdownFieldProps>(
  ({ value, onChange, iconStart, iconEnd, isActive = false, className, ...other }, ref) => {
    const { classes, cx } = useStyles({ isActive, isIconStart: Boolean(iconStart), isIconEnd: Boolean(iconEnd) });
    return (
      <div className={classes.root}>
        {iconStart && <div className={cx(classes.icon, classes.iconStart)}>{iconStart}</div>}
        <TextInput {...other} ref={ref} className={cx(classes.input, className)} value={value} onChange={onChange} />
        {iconEnd && <div className={cx(classes.icon, classes.iconEnd)}>{iconEnd}</div>}
      </div>
    );
  }
);

export default DropdownField;
