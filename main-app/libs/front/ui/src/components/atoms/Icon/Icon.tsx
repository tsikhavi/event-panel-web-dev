import React, { FC } from 'react';

import { useStyles } from './Icon.styles';

export type Sizes = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  icon: React.FunctionComponent;
  size?: Sizes;
  className?: string;
};

const Icon: FC<IconProps> = ({ className, icon: SVG, size = 'md' }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, classes[size], className)}>
      <SVG />
    </div>
  );
};

export default Icon;
