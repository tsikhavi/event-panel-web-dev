import { customRender, fireEvent } from '../../../../test-utils';

import Checkbox, { CheckboxProps } from './Checkbox';

const getProps = (props: Partial<CheckboxProps> = {}): CheckboxProps => ({
  label: 'label',
  checked: false,
  onChange: jest.fn(),
  ...props,
});

describe('Checkbox', () => {
  it('should render checkboxOff', () => {
    const props = getProps();
    const { getByLabelText, queryByText } = customRender(<Checkbox {...props} />);

    expect(getByLabelText(props.label)).toBeInTheDocument();
    expect(queryByText(/checkboxOff/)).toBeInTheDocument();
  });

  it('should render checkboxOn', () => {
    const props = getProps({ checked: true });
    const { getByLabelText, queryByText } = customRender(<Checkbox {...props} />);

    expect(getByLabelText(props.label)).toBeInTheDocument();
    expect(queryByText(/checkboxOn/)).toBeInTheDocument();
  });

  it('should call onChange on click', () => {
    const onChange = jest.fn();
    const props = getProps({ onChange, checked: false });
    const { getByLabelText } = customRender(<Checkbox {...props} />);

    fireEvent.change(getByLabelText(props.label), { target: { checked: true } });
    fireEvent.click(getByLabelText(props.label));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it.each<[boolean, RegExp]>([
    [true, /checkboxOn/],
    [false, /checkboxOff/],
  ])('should call onChange when checked: %s', (checked, icon) => {
    const onChange = jest.fn();
    const props = getProps({ onChange, checked });
    const { queryByText } = customRender(<Checkbox {...props} />);

    fireEvent.click(queryByText(icon) as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
