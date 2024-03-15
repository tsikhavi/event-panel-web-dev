import { customRender, fireEvent } from '../../../../../test-utils';

import FilterButton, { FilterButtonProps } from './FilterButton';

const getProps = (props: Partial<FilterButtonProps> = {}): FilterButtonProps => ({
  label: 'label',
  onClick: jest.fn(),
  isActive: false,
  ...props,
});

describe('FilterButton', () => {
  it('should render', () => {
    const props = getProps();
    const { getByText, queryByText } = customRender(<FilterButton {...props} />);

    expect(getByText(props.label)).toBeInTheDocument();
    expect(queryByText(/arrowDown/)).toBeInTheDocument();
  });

  it('should render isActive', () => {
    const props = getProps({ isActive: true });
    const { getByText } = customRender(<FilterButton isActive {...props} />);

    expect(getByText(props.label).className).toContain('active');
  });

  it('should call onClick', () => {
    const props = getProps();
    const { getByText } = customRender(<FilterButton isActive {...props} />);

    fireEvent.click(getByText(props.label));
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
