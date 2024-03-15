import React, { FC, useState } from 'react';

import { MenuDots } from '../../../assets/images';
import Button from '../Buttons/Button/Button';
import IconButton from '../Buttons/IconButton/IconButton';
import Popover from '../Popover/Popover';

import useStyles from './ContextMenu.styles';

export type ContextMenuItem = {
  label: string;
  onClick: () => void;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
};

const ContextMenu: FC<ContextMenuProps> = ({ items }) => {
  const { classes, cx } = useStyles();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (item: ContextMenuItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      anchor={
        <IconButton
          className={cx(classes.icon, { [classes.iconActive]: isOpen })}
          icon={MenuDots}
          size={'md'}
          onClick={() => setIsOpen(true)}
        />
      }
      onClose={() => setIsOpen(false)}
    >
      <div className={classes.dropdown}>
        {items.map((item, index) => (
          <Button key={index} variant="text" label={item.label} onClick={() => handleClick(item)} />
        ))}
      </div>
    </Popover>
  );
};

export default ContextMenu;
