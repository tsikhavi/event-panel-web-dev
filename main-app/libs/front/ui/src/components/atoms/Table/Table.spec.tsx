import { customRender } from '../../../test-utils';

import Table, { TableProps } from './Table';

const headerLeft = 'Header Left';
const headerRight = 'Header Right';

const columnHeader = 'Column Header';
const cellData = 'Cell Data';

const getProps = (props: Partial<TableProps> = {}): Omit<TableProps, 'children'> => ({
  HeaderLeft: headerLeft,
  HeaderRight: headerRight,
  ...props,
});

describe('Table', () => {
  it('should render default', () => {
    const { getByText, getAllByText } = customRender(
      <Table {...getProps()}>
        <thead>
          <Table.TableRow>
            <Table.TableCell isHeader>{columnHeader}</Table.TableCell>
            <Table.TableCell isHeader>{columnHeader}</Table.TableCell>
            <Table.TableCell isHeader>{columnHeader}</Table.TableCell>
            <Table.TableCell isHeader>{columnHeader}</Table.TableCell>
          </Table.TableRow>
        </thead>
        <tbody>
          <Table.TableRow>
            <Table.TableCell>{cellData}</Table.TableCell>
            <Table.TableCell>{cellData}</Table.TableCell>
            <Table.TableCell>{cellData}</Table.TableCell>
            <Table.TableCell>{cellData}</Table.TableCell>
          </Table.TableRow>
          <Table.TableRow>
            <Table.TableCell>{cellData}</Table.TableCell>
            <Table.TableCell>{cellData}</Table.TableCell>
            <Table.TableCell>{cellData}</Table.TableCell>
            <Table.TableCell>{cellData}</Table.TableCell>
          </Table.TableRow>
        </tbody>
      </Table>
    );

    expect(getByText(headerLeft)).toBeInTheDocument();
    expect(getByText(headerRight)).toBeInTheDocument();

    expect(getAllByText(columnHeader).length).toBe(4);
    expect(getAllByText(cellData).length).toBe(8);
  });

  describe('HeaderLeft & HeaderRight', () => {
    it('should render without HeaderLeft', () => {
      const props = getProps({ HeaderLeft: undefined });
      const { getByText, queryByText } = customRender(
        <Table {...props}>
          <thead>
            <Table.TableRow>
              <Table.TableCell>{columnHeader}</Table.TableCell>
            </Table.TableRow>
          </thead>
        </Table>
      );

      expect(queryByText(headerLeft)).not.toBeInTheDocument();
      expect(getByText(headerRight)).toBeInTheDocument();
    });

    it('should render without HeaderRight', () => {
      const props = getProps({ HeaderRight: undefined });
      const { getByText, queryByText } = customRender(
        <Table {...props}>
          <thead>
            <Table.TableRow>
              <Table.TableCell>{columnHeader}</Table.TableCell>
            </Table.TableRow>
          </thead>
        </Table>
      );

      expect(queryByText(headerRight)).not.toBeInTheDocument();
      expect(getByText(headerLeft)).toBeInTheDocument();
    });

    it('should render without header', () => {
      const props = getProps({ HeaderLeft: undefined, HeaderRight: undefined });
      const { queryByText } = customRender(
        <Table {...props}>
          <thead>
            <Table.TableRow>
              <Table.TableCell>{columnHeader}</Table.TableCell>
            </Table.TableRow>
          </thead>
        </Table>
      );

      expect(queryByText(headerLeft)).not.toBeInTheDocument();
      expect(queryByText(headerRight)).not.toBeInTheDocument();
    });
  });

  describe('TableCell', () => {
    it('should should render default', () => {
      const { getByText } = customRender(
        <Table {...getProps()}>
          <tbody>
            <Table.TableRow>
              <Table.TableCell>{cellData}</Table.TableCell>
            </Table.TableRow>
          </tbody>
        </Table>
      );

      expect(getByText(cellData)).toBeInTheDocument();
      expect(getByText(cellData).tagName.toLowerCase()).toBe('td');
    });

    it('should should render header', () => {
      const { getByText } = customRender(
        <Table {...getProps()}>
          <thead>
            <Table.TableRow>
              <Table.TableCell isHeader>{columnHeader}</Table.TableCell>
            </Table.TableRow>
          </thead>
        </Table>
      );

      expect(getByText(columnHeader)).toBeInTheDocument();
      expect(getByText(columnHeader).tagName.toLowerCase()).toBe('th');
    });

    it('should should render with className', () => {
      const className = 'className';
      const { getByText } = customRender(
        <Table {...getProps()}>
          <thead>
            <Table.TableRow>
              <Table.TableCell isHeader className={className}>
                {columnHeader}
              </Table.TableCell>
            </Table.TableRow>
          </thead>
        </Table>
      );
      expect(getByText(columnHeader).className).toContain(className);
    });
  });

  describe('TableRow', () => {
    it('should render default', () => {
      const { getByText } = customRender(
        <Table {...getProps()}>
          <tbody>
            <Table.TableRow>
              <Table.TableCell>{cellData}</Table.TableCell>
            </Table.TableRow>
          </tbody>
        </Table>
      );

      expect(getByText(cellData).parentElement?.className).toContain('tableRow');
    });
    it('should render isFlex', () => {
      const { getByText } = customRender(
        <Table {...getProps()}>
          <tbody>
            <Table.TableRow isFlex>
              <Table.TableCell>{cellData}</Table.TableCell>
            </Table.TableRow>
          </tbody>
        </Table>
      );

      expect(getByText(cellData).parentElement?.className).toContain('tableRowFlex');
    });
  });
});
