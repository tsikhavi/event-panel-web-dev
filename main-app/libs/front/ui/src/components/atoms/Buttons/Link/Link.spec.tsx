import { BrowserRouter } from 'react-router-dom';

import { customRender } from '../../../../test-utils';

import Link, { LinkProps } from './Link';

const getProps = (props: Partial<LinkProps> = {}): LinkProps => ({
  to: '/to/the/bright/future/',
  children: 'Link to The Bright Future',
  ...props,
});

describe('Link', () => {
  it('should renders default', () => {
    const props = getProps();
    const { getByText } = customRender(
      <BrowserRouter>
        <Link {...props} />
      </BrowserRouter>
    );

    expect(getByText(props.children as string)).toBeInTheDocument();
    expect(getByText(props.children as string)).toHaveAttribute('href', props.to);
  });
});
