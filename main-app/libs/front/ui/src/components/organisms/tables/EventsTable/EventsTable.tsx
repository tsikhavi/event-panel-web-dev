import React, { FC } from 'react';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';

import Chips from '../../../atoms/Chips/Chips';
import Grid from '../../../atoms/Grid/Grid';
import Table from '../../../atoms/Table/Table';
import Typography from '../../../atoms/Typography/Typography';

import useStyles from './EventsTable.styles';

export type EventsTableProps = {
  events: EventDto[];
} & Partial<{
  categoryName: string;
  eventsAmount: number;
}>;

const EventsTable: FC<EventsTableProps> = ({ events, categoryName, eventsAmount = 0 }) => {
  const { classes, cx } = useStyles();

  const rednerHeaderLeft = () => {
    if (!categoryName) return null;
    return (
      <Grid container direction="column" gap={1}>
        <Grid item>
          <Typography variant="bodyXS" color="secondary">
            Category
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="bodyM">{categoryName}</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderHeaderRight = () => {
    if (eventsAmount < 2) return null;
    return <Typography variant="bodyS" color="secondary">{`${eventsAmount} events`}</Typography>;
  };

  const renderEvents = () => {
    return events.map(({ id, name, description, sources }) => (
      <Table.TableRow key={id}>
        <Table.TableCell>
          <div className={cx(classes.cellFlexColumn, classes.cellGap)}>
            <Typography variant="bodyS">{name}</Typography>
            <Typography variant="bodyXS" color="secondary">
              {description}
            </Typography>
          </div>
        </Table.TableCell>

        <Table.TableCell>
          <div className={classes.cellFlexColumn}>
            {[
              'available_auth_services: [String]',
              'available_auth_services: [String]',
              'available_auth_services: [String]',
            ].map((parameter, index) => (
              <Typography key={index} variant="bodyXS" color="secondary">
                {parameter}
              </Typography>
            ))}
          </div>
        </Table.TableCell>

        <Table.TableCell>
          <div className={classes.cellFlexRow}>
            {sources?.map((source, index) => (
              <Chips key={index} label={source.name} />
            ))}
          </div>
        </Table.TableCell>

        <Table.TableCell>
          <div className={cx(classes.cellFlexRow, classes.cellWrap)}>
            {['Generated', 'Skipped'].map((source, index) => (
              <Chips key={index} label={source} />
            ))}
          </div>
        </Table.TableCell>
      </Table.TableRow>
    ));
  };

  return (
    <Table HeaderLeft={rednerHeaderLeft()} HeaderRight={renderHeaderRight()}>
      <thead>
        <Table.TableRow>
          <Table.TableCell isHeader>Name</Table.TableCell>
          <Table.TableCell isHeader>Parameters</Table.TableCell>
          <Table.TableCell isHeader>Sources</Table.TableCell>
          <Table.TableCell isHeader>Tags</Table.TableCell>
        </Table.TableRow>
      </thead>
      <tbody>{renderEvents()}</tbody>
    </Table>
  );
};

export default EventsTable;
