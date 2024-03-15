import { customRender } from '../../../test-utils';

import Chips, { Variants } from './Chips';

describe('Clip', () => {
  const label = 'iOS';

  it('should renders', () => {
    const { getByText } = customRender(<Chips label={label} />);

    expect(getByText(label)).toBeInTheDocument();
  });

  it.each<[Variants, Variants]>([
    ['default', 'default'],
    ['disabled', 'disabled'],
    ['active', 'active'],
  ])('should render with class variant: %s', (variant, result) => {
    const { getByText } = customRender(<Chips label={label} variant={variant} />);

    expect(getByText(label).className).toContain(result);
  });
});
