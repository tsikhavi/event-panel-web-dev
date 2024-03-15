import React, { FC } from 'react';

import useStyles from './Grid.styles';

type GridContainerProps = {
  container: boolean;
} & Partial<{
  direction: 'row' | 'column';
  justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  gap: number;

  item: never;
  size: never;
}>;

type GridItemProps = {
  item: boolean;
} & Partial<{
  size: number;

  container: never;
  direction: never;
  justify: never;
  align: never;
  gap: never;
}>;

export type GridProps = Partial<{
  children: React.ReactNode;
}>;

const Grid: FC<GridProps & (GridContainerProps | GridItemProps)> = ({
  container,
  item,
  gap,
  size,
  direction,
  justify,
  align,
  children,
}) => {
  const { classes, cx } = useStyles({ gap, size, direction, justify, align });

  return <div className={cx({ [classes.container]: container, [classes.item]: item })}>{children}</div>;
};

export default Grid;
