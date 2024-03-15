import React, { Fragment } from 'react';

import { customRender } from '../../../test-utils';
import { useStyles } from '../../../theme/makeStyles';

import GlobalStyles from './GlobalStyles';

const mockUseStyles = jest.fn<Omit<ReturnType<typeof useStyles>, 'cx' | 'css'>, unknown[]>();
jest.mock('../../../theme/makeStyles', () => ({
  useStyles: () => mockUseStyles(),
}));

describe('GlobalStyles', () => {
  beforeEach(() => {
    const { lightTheme } = jest.requireActual('../../../theme/theme');
    mockUseStyles.mockReturnValue({ theme: lightTheme });
  });

  it('should render the component without errors', () => {
    customRender(<GlobalStyles />);
  });

  it('should calls addFontFaces and renders TssGlobalStyles with correct props', () => {
    const text = 'Some Text';
    const { getByText } = customRender(
      <Fragment>
        <GlobalStyles />
        <span>{text}</span>
      </Fragment>
    );

    expect(getByText(text)).toHaveStyle('font-family: NunitoSans,Arial,sans-serif;');
  });
});
