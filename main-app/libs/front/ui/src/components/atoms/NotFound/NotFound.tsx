import React, { FC } from 'react';

import { NotFound404 } from '../../../assets/images/index';
import Button from '../Buttons/Button/Button';
import Typography from '../Typography/Typography';

import useStyles from './NotFound.styles';

export type NotFoundProps = {
  isAuth: boolean;
  onNavigate: () => void;
};

const NotFound: FC<NotFoundProps> = ({ isAuth, onNavigate }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.textWrapper}>
          <Typography variant={'h2'} color={'primary'}>
            Page Not Found
          </Typography>
          <Typography variant={'bodyM'} color={'secondary'}>
            Sorry. the content you’re looking for doesn’t exist.
            <br /> Either it was removed, or you mistyped the link.
          </Typography>
        </div>
        {!isAuth ? <Button label={'Back To Home'} onClick={onNavigate} /> : null}
      </div>
      <NotFound404 />
    </div>
  );
};

export default NotFound;
