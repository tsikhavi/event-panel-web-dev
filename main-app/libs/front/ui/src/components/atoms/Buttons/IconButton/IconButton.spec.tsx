import { Add } from '../../../../assets/images';
import { customRender, fireEvent } from '../../../../test-utils';

import IconButton, { IconButtonProps } from './IconButton';

const getProps = (props: Partial<IconButtonProps> = {}): IconButtonProps => ({
  icon: Add,
  ...props,
});

describe('IconButton', () => {
  it('should render icon', () => {
    const { queryByText } = customRender(<IconButton {...getProps()} />);

    expect(queryByText(/add/)).toBeInTheDocument();
  });

  it('should render with className', () => {
    const className = 'className';
    const { getByRole } = customRender(<IconButton {...getProps({ className })} />);

    expect(getByRole('button')?.className).toContain(className);
  });

  it('should call onClick on click', () => {
    const onClick = jest.fn();
    const { queryByText } = customRender(<IconButton {...getProps({ onClick })} />);

    fireEvent.click(queryByText(/add/) as Element);

    expect(onClick).toHaveBeenCalled();
  });
});
