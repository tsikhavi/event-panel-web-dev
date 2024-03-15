import React from 'react';

import { Add } from '../../../../assets/images';
import Icon from '../../../atoms/Icon/Icon';
import Loader from '../../../atoms/Loader/Loader';
import Paper from '../../../atoms/Paper/Paper';

import useStyles from './WorkspacesList.styles';

type ItemProps = Partial<{
  add: boolean;
  children: React.ReactNode;
  onClick: () => void;
}>;

type WorkspacesListComposition = {
  Item: (props: ItemProps) => JSX.Element;
};

export type WorkspacesListProps = {
  children: React.ReactNode;
  onAddWorkspace: () => void;
} & Partial<{
  isLoading: boolean;
}>;

type WorkspacesListWrapper = (props: WorkspacesListProps) => JSX.Element;

const WorkspacesList: WorkspacesListWrapper & WorkspacesListComposition = ({ children, isLoading, onAddWorkspace }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Loader isLoading={Boolean(isLoading)} />

      <Item onClick={onAddWorkspace}>
        <Icon size="lg" icon={Add} />
      </Item>

      {children}
    </div>
  );
};

const Item = ({ children, onClick }: ItemProps) => {
  const { classes } = useStyles();

  return (
    <div onClick={() => onClick?.()}>
      <Paper className={classes.item}>{children}</Paper>
    </div>
  );
};

WorkspacesList.Item = Item;

export default WorkspacesList;
