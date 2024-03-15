import { customRender } from '../../../../test-utils';

import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
  it('should render default', () => {
    const children = 'children';
    const { getByText } = customRender(<ButtonGroup>{children}</ButtonGroup>);

    expect(getByText(children)).toBeInTheDocument();
  });
});
