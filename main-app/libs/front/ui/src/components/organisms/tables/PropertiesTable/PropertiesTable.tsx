import React, { FC } from 'react';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

import Table from '../../../atoms/Table/Table';
import Typography from '../../../atoms/Typography/Typography';

import useStyles from './PropertiesTable.styles';

export type PropertiesTableProps = {
  properties: PropertyDto[];
};

const PropertiesTable: FC<PropertiesTableProps> = ({ properties }) => {
  const { classes } = useStyles();

  const renderProperties = () => {
    return properties.map(({ id, name, description }) => (
      <Table.TableRow key={id} isFlex>
        <Table.TableCell size={1} className={classes.flexCell}>
          <Typography variant="bodyS">{name}</Typography>
          <Typography variant="bodyXS" color="secondary">
            {description}
          </Typography>
        </Table.TableCell>

        <Table.TableCell size={1} className={classes.flexCell}>
          string
        </Table.TableCell>
        <Table.TableCell size={1} className={classes.flexCell}>
          Login Button Tap
        </Table.TableCell>
        <Table.TableCell size={1} className={classes.flexCell}>
          Active Order
        </Table.TableCell>
        <Table.TableCell size={1} className={classes.flexCell}>
          Optional
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
            Property Type
          </Table.TableCell>
          <Table.TableCell isHeader size={1}>
            Events
          </Table.TableCell>
          <Table.TableCell isHeader size={1}>
            Constraints
          </Table.TableCell>
          <Table.TableCell isHeader size={1}>
            Optionality
          </Table.TableCell>
        </Table.TableRow>
      </thead>

      <tbody>{renderProperties()}</tbody>
    </Table>
  );
};

export default PropertiesTable;
