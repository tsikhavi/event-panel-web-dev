import { routerRender } from '../../../test-utils';

import Logo from './Logo';

describe('Logo', () => {
  it('should render', () => {
    const { container } = routerRender(<Logo />);

    expect(container.textContent).toBe('EVENT PANEL');
  });

  it('should render without text', () => {
    const { container } = routerRender(<Logo onlyImage />);

    expect(container.textContent).not.toBe('EVENT PANEL');
  });

  it('should render invert', () => {
    const { container } = routerRender(<Logo invert />);

    expect(container.children[0].className).toContain('invert');
  });
});
