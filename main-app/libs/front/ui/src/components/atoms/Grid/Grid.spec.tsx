import { customRender } from '../../../test-utils';

import Grid from './Grid';

describe('Grid', () => {
  it('should render children', () => {
    const children = 'children';
    const { getByText } = customRender(
      <Grid container>
        <Grid item>{children}</Grid>
      </Grid>
    );

    expect(getByText(children)).toBeInTheDocument();
    expect(getByText(children).className).toContain('item');
    expect(getByText(children).parentElement?.className).toContain('container');
  });
});
