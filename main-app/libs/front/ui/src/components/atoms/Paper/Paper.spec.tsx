import { customRender } from '../../../test-utils';

import Paper from './Paper';

describe('Paper', () => {
  it('should render children', () => {
    const children = 'children';
    const { getByText } = customRender(<Paper>{children}</Paper>);

    expect(getByText(children)).toBeInTheDocument();
  });

  it('should render with className', () => {
    const children = 'children';
    const className = 'className';
    const { getByText } = customRender(<Paper className={className}>{children}</Paper>);

    expect(getByText(children)?.className).toContain(className);
  });
});
