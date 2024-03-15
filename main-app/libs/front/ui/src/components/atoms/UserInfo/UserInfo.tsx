import React, { FC, useState } from 'react';

import { MenuDots } from '../../../assets/images/index';
import IconButton from '../Buttons/IconButton/IconButton';
import Dropdown from '../Inputs/Dropdown/Dropdown';

import useStyles from './UserInfo.styles';

type Action = {
  label: string;
  onClick: () => void;
};

export type UserInfoProps = {
  email: string;
  workspace?: string;
  actions: Action[];
};

const UserInfo: FC<UserInfoProps> = ({ workspace, email, actions }) => {
  const { classes } = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <Dropdown
      anchor={
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <div className={classes.workspace}>{workspace || 'No workspace'}</div>
            <div className={classes.email}>{email}</div>
          </div>
          <div>
            <IconButton icon={MenuDots} onClick={() => setIsOpen(true)} />
          </div>
        </div>
      }
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      withAnchorWidth
    >
      {actions.map((action, index) => (
        <div key={index} className={classes.item} onClick={() => handleItemClick(action.onClick)}>
          {action.label}
        </div>
      ))}
    </Dropdown>
  );
};

export default UserInfo;
