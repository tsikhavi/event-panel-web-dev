import { customRender } from '../../../test-utils';

import Loader, { LoaderProps } from './Loader';

const getProps = (props: Partial<LoaderProps> = {}): LoaderProps => ({
  isLoading: true,
  ...props,
});

describe('ProgressBar', () => {
  it('should render', () => {
    const { getByTestId } = customRender(<Loader {...getProps()} />);

    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should NOT render', () => {
    const { queryByTestId } = customRender(<Loader {...getProps({ isLoading: false })} />);

    expect(queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should render with custom testId', () => {
    const testId = 'test-loader';
    const { getByTestId } = customRender(<Loader {...getProps({ testId })} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
