import React, { createContext, useContext } from 'react';

import useStyles from './Table.styles';

type TableCellProps = {
  children: React.ReactNode;
} & Partial<{
  size: number;
  isHeader: boolean;
  className: string;
}>;

type TableRowProps = {
  children: React.ReactNode;
} & Partial<{
  isFlex: boolean;
}>;

type TableComposition = {
  TableRow: (props: TableRowProps) => JSX.Element;
  TableCell: (props: TableCellProps) => JSX.Element;
};

export type TableProps = {
  children: React.ReactNode;
} & Partial<{
  HeaderLeft: React.ReactNode;
  HeaderRight: React.ReactNode;
}>;

type TableWrapper = (props: TableProps) => JSX.Element;

const TableContext = createContext({ isHighlighted: false });

const Table: TableComposition & TableWrapper = ({ children: Table, HeaderLeft, HeaderRight }) => {
  const { classes, cx } = useStyles({});

  const hasHeader = Boolean(HeaderLeft || HeaderRight);

  return (
    <TableContext.Provider value={{ isHighlighted: !hasHeader }}>
      <div className={classes.root}>
        {hasHeader && (
          <div className={cx(classes.header, classes.highlighted)}>
            <div>{HeaderLeft}</div>
            <div>{HeaderRight}</div>
          </div>
        )}

        <table className={classes.table}>{Table}</table>

        <div className={cx(classes.footer, classes.highlighted)} />
      </div>
    </TableContext.Provider>
  );
};

const TableRow = ({ isFlex, children }: TableRowProps) => {
  const { classes, cx } = useStyles({});

  return <tr className={cx(classes.tableRow, { [classes.tableRowFlex]: isFlex })}>{children}</tr>;
};

const TableCell = ({ children, size, isHeader, className }: TableCellProps) => {
  const { classes, cx } = useStyles({ size });
  const { isHighlighted } = useContext(TableContext);

  const Tag = (isHeader ? 'th' : 'td') as React.ElementType;

  return (
    <Tag
      className={cx(classes.tableCell, className, {
        [classes.highlighted]: Boolean(isHeader && isHighlighted),
      })}
    >
      {children}
    </Tag>
  );
};

Table.TableRow = TableRow;
Table.TableCell = TableCell;

export default Table;
