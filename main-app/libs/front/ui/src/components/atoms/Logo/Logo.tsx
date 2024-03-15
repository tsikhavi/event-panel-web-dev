import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import useStyles from './Logo.styles';

export type LogoProps = {
  invert?: boolean;
  onlyImage?: boolean;
};

const Logo: FC<LogoProps> = ({ invert, onlyImage }) => {
  const { classes, cx } = useStyles();

  return (
    <Link to={'/'} className={cx(classes.root, { [classes.invert]: invert })}>
      <div className={classes.logo} />
      {!onlyImage && <div className={classes.label}>EVENT PANEL</div>}
    </Link>
  );
};

export default Logo;
