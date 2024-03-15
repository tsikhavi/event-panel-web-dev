import React, { FC } from 'react';

import Icon, { Sizes as IconSizes } from '../../Icon/Icon';

import useStyles from './IconButton.styles';

export type IconButtonProps = {
  icon: React.FunctionComponent;
  size?: IconSizes;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: FC<IconButtonProps> = ({ icon, size, className, onClick }) => {
  const { classes, cx } = useStyles();

  return (
    <button type="button" className={cx(classes.root, className)} onClick={onClick}>
      <Icon icon={icon} size={size} />
    </button>
  );
};

export default IconButton;
