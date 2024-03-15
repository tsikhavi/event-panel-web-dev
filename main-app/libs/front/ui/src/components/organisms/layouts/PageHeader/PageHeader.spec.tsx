import { customRender } from '../../../../test-utils';

import PageHeader, { PageHeaderProps } from './PageHeader';

const getProps = (props: Partial<PageHeaderProps> = {}): PageHeaderProps => ({
  header: 'Header',
  Actions: 'Actions',
  Search: 'Search',
  Filters: 'Filters',
  ...props,
});

describe('PageHeader', () => {
  it('should render default', () => {
    const props = getProps();
    const { getByText } = customRender(<PageHeader {...props} />);

    expect(getByText(props.header)).toBeInTheDocument();
    expect(getByText(String(props.Actions))).toBeInTheDocument();
    expect(getByText(String(props.Search))).toBeInTheDocument();
    expect(getByText(String(props.Filters))).toBeInTheDocument();
  });
});
