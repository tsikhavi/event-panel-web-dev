import { customRender, fireEvent } from '../../../../../test-utils';

import RoundedSearchField, { SearchFieldProps } from './RoundedSearchField';

const getProps = (props: Partial<SearchFieldProps> = {}): SearchFieldProps => ({
  value: '',
  onChange: jest.fn(),
  onKeyDown: jest.fn(),
  placeholder: 'Search',
  ...props,
});

describe('RoundedSearchField', () => {
  it('should render', () => {
    const props = getProps();
    const { getByPlaceholderText } = customRender(<RoundedSearchField {...props} />);

    expect(getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    const value = 'Some new value';
    const { getByPlaceholderText } = customRender(<RoundedSearchField {...getProps({ onChange })} />);

    fireEvent.change(getByPlaceholderText('Search'), { target: { value } });

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should call onKeyDown', () => {
    const onKeyDown = jest.fn();
    const { getByPlaceholderText } = customRender(<RoundedSearchField {...getProps({ onKeyDown })} />);

    fireEvent.keyDown(getByPlaceholderText('Search'));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should call onChange on clear button click', () => {
    const onChange = jest.fn();
    const value = 'Some new value';
    const { getByPlaceholderText, queryByText } = customRender(
      <RoundedSearchField {...getProps({ onChange, value: 'value' })} />
    );

    fireEvent.change(getByPlaceholderText('Search'), { target: { value } });
    expect(onChange).toHaveBeenCalledWith(value);

    fireEvent.click(queryByText(/cross/) as Element);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should render with fullWidth', () => {
    const { getByPlaceholderText } = customRender(<RoundedSearchField {...getProps({ fullWidth: true })} />);

    expect(getByPlaceholderText('Search').parentElement?.className).toContain('fullWidth');
  });

  it('should render with autoFocus', () => {
    const { getByPlaceholderText } = customRender(<RoundedSearchField {...getProps({ autoFocus: true })} />);

    expect(getByPlaceholderText('Search')).toHaveFocus();
  });
});
