import React, { FC } from 'react';

import Icon, { Sizes } from '../../Icon/Icon';

import useStyles from './Button.styles';

export type Types = 'button' | 'submit' | 'reset';
export type Variants = 'contained' | 'outlined' | 'ghost' | 'text' | 'authorization';

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  type?: Types;
  variant?: Variants;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  startIcon?: React.FunctionComponent;
  endIcon?: React.FunctionComponent;
  iconSize?: Sizes;
  form?: string;
};

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  startIcon,
  endIcon,
  iconSize,
  fullWidth,
  type = 'button',
  variant = 'contained',
  form,
}) => {
  const { classes, cx } = useStyles();

  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(classes.root, classes[variant], { [classes.fullWidth]: Boolean(fullWidth) })}
      onClick={onClick}
      form={form}
    >
      {startIcon && <Icon icon={startIcon} size={iconSize} />}

      {label}

      {endIcon && <Icon icon={endIcon} size={iconSize} />}
    </button>
  );
};

export default Button;
