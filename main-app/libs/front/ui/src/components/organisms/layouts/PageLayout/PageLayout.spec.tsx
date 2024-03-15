import { customRender } from '../../../../test-utils';

import PageLayout, { PageLayoutProps } from './PageLayout';

const getProps = (props: Partial<PageLayoutProps> = {}): PageLayoutProps => ({
  Header: 'Header',
  Content: 'Content',
  ...props,
});

describe('PageLayout', () => {
  it('should render default', () => {
    const props = getProps();
    const { getByText } = customRender(<PageLayout {...props} />);

    expect(getByText(String(props.Header))).toBeInTheDocument();
    expect(getByText(String(props.Content))).toBeInTheDocument();
  });
});
