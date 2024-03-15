import React, { FC } from 'react';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';

import Table from '../../../atoms/Table/Table';
import Typography from '../../../atoms/Typography/Typography';

import useStyles from './GroupsTable.styles';

export type GroupsTableProps = {
  groups: GroupDto[];
};

const GroupsTable: FC<GroupsTableProps> = ({ groups }) => {
  const { classes } = useStyles();

  const renderGroups = () => {
    return groups.map(({ id, name, description }) => (
      <Table.TableRow key={id} isFlex>
        <Table.TableCell size={1} className={classes.flexCell}>
          <Typography variant="bodyS">{name}</Typography>
          <Typography variant="bodyXS" color="secondary">
            {description}
          </Typography>
        </Table.TableCell>
        <Table.TableCell size={1} className={classes.flexCell}>
          12
        </Table.TableCell>
        <Table.TableCell size={1} className={classes.flexCell}>
          124
        </Table.TableCell>
      </Table.TableRow>
    ));
  };

  return (
    <Table>
      <thead>
        <Table.TableRow isFlex>
          <Table.TableCell isHeader size={1}>
            Name
          </Table.TableCell>
          <Table.TableCell isHeader size={1}>
            Amount of Categories
          </Table.TableCell>
          <Table.TableCell isHeader size={1}>
            Amount of Events
          </Table.TableCell>
        </Table.TableRow>
      </thead>
      <tbody>{renderGroups()}</tbody>
    </Table>
  );
};

export default GroupsTable;
