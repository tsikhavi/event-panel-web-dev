import React from 'react';

import { customRender } from '../../../test-utils';

import Icon, { Sizes } from './Icon';

describe('Icon', () => {
  const svg = 'svg';
  const icon = () => <svg>{svg}</svg>;

  it('should render SVG', () => {
    const { getByText } = customRender(<Icon icon={icon} />);

    expect(getByText(svg).tagName).toBe('svg');
  });

  it('should render with className', () => {
    const className = 'className';
    const { getByText } = customRender(<Icon icon={icon} className={className} />);

    expect(getByText(svg).parentElement?.className || '').toContain(className);
  });

  it.each<[Sizes, Sizes]>([
    ['sm', 'sm'],
    ['md', 'md'],
    ['xl', 'xl'],
  ])('should renders with size: %s', (size, className) => {
    const { getByText } = customRender(<Icon icon={icon} size={size} />);

    expect(getByText(svg).parentElement?.className || '').toContain(className);
  });
});
