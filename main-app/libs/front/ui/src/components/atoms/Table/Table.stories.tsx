import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Table, { TableProps } from './Table';

export default {
  component: Table,
} as Meta<TableProps>;

type Story = StoryObj<typeof Table>;

const Component: FC<Pick<TableProps, 'HeaderLeft' | 'HeaderRight'>> = ({ ...props }) => (
  <Table {...props}>
    <thead>
      <Table.TableRow>
        <Table.TableCell isHeader>Column Header</Table.TableCell>
        <Table.TableCell isHeader>Column Header</Table.TableCell>
        <Table.TableCell isHeader>Column Header</Table.TableCell>
        <Table.TableCell isHeader>Column Header</Table.TableCell>
      </Table.TableRow>
    </thead>
    <tbody>
      <Table.TableRow>
        <Table.TableCell>Cell Data</Table.TableCell>
        <Table.TableCell>Cell Data</Table.TableCell>
        <Table.TableCell>Cell Data</Table.TableCell>
        <Table.TableCell>Cell Data</Table.TableCell>
      </Table.TableRow>
      <Table.TableRow>
        <Table.TableCell>Cell Data</Table.TableCell>
        <Table.TableCell>Cell Data</Table.TableCell>
        <Table.TableCell>Cell Data</Table.TableCell>
        <Table.TableCell>Cell Data</Table.TableCell>
      </Table.TableRow>
    </tbody>
  </Table>
);

export const Default: Story = {
  render: (args) => (
    <>
      <Component {...args} />
      <Component {...args} HeaderLeft="Left Header" HeaderRight="Right Header" />
    </>
  ),
};
