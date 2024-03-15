import React, { FC, useState } from 'react';

import { Cross, Danger, InfoCircle, TickSquare } from '../../../../assets/images';
import IconButton from '../../Buttons/IconButton/IconButton';
import Icon from '../../Icon/Icon';
import Typography from '../../Typography/Typography';

import useStyles from './Alert.styles';

export type Variants = 'info' | 'success' | 'error';

export type AlertProps = {
  message: string;

  header?: string;
  variant?: Variants;
  closeButton?: boolean;
};

const Alert: FC<AlertProps> = ({ header, message, variant = 'info', closeButton = false }) => {
  const { classes, cx } = useStyles({ header: Boolean(header) });
  const [isOpen, setIsOpen] = useState(true);

  const getIcon = () => {
    switch (variant) {
      case 'error':
        return Danger;
      case 'info':
        return InfoCircle;
      case 'success':
        return TickSquare;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cx(classes.root, classes[variant])}>
      <Icon icon={getIcon()} className={cx(classes.icon, classes[`${variant}Icon`])} />

      <div className={classes.messageBlock}>
        {header && (
          <Typography variant="bodyM" className={classes.header}>
            {header}
          </Typography>
        )}

        <Typography variant="bodyXS" className={classes.message}>
          {message}
        </Typography>
      </div>

      {closeButton && <IconButton icon={Cross} onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default Alert;
