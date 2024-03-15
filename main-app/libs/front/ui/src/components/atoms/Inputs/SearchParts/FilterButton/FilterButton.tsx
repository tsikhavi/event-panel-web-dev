import React, { FC } from 'react';

import { ArrowDown } from '../../../../../assets/images';
import Icon from '../../../Icon/Icon';

import useStyles from './FilterButton.styles';

export type FilterButtonProps = {
  label: string;
  onClick: () => void;
} & Partial<{
  isActive: boolean;
}>;

const FilterButton: FC<FilterButtonProps> = ({ label, onClick, isActive }) => {
  const { classes, cx } = useStyles();

  return (
    <button type="button" className={cx(classes.root, { [classes.active]: isActive })} onClick={() => onClick()}>
      {label}
      <Icon icon={ArrowDown} size="sm" />
    </button>
  );
};

export default FilterButton;
