import { customRender, fireEvent } from '../../../../test-utils';

import TextInput, { TextInputProps, Types } from './TextInput';

const testId = 'testId';
const getProps = (props: Partial<TextInputProps> = {}): TextInputProps => ({
  name: 'email',
  value: null,
  onChange: jest.fn(),
  ...props,
});

describe('TextInput', () => {
  it('should render with empty value', () => {
    const { getByTestId } = customRender(<TextInput {...getProps({ testId })} />);

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveAttribute('value', '');
  });

  it('should render with NOT empty value', () => {
    const value = 'some value';
    const { getByTestId } = customRender(<TextInput {...getProps({ testId, value })} />);

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveAttribute('value', value);
  });

  it('should call onChange', () => {
    const value = 'Some value';
    const props = getProps({ testId });
    const { getByTestId } = customRender(<TextInput {...props} />);

    fireEvent.change(getByTestId(testId), { target: { value } });

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(value);
  });

  it('should be disabled when disabled === true', () => {
    const { getByTestId } = customRender(<TextInput {...getProps({ testId, disabled: true })} />);

    expect(getByTestId(testId)).toBeDisabled();
  });

  it.each<[Types, Types]>([
    ['text', 'text'],
    ['email', 'email'],
    ['password', 'password'],
  ])('should render with type: %s', (type, result) => {
    const { getByTestId } = customRender(<TextInput {...getProps({ testId, type })} />);

    expect(getByTestId(testId)).toHaveAttribute('type', result);
  });

  it.each<[string, string]>([
    ['error', 'error'],
    ['success', 'success'],
  ])('should render with className: %s', (prop, className) => {
    const { getByTestId } = customRender(<TextInput {...getProps({ testId, [prop]: true })} />);

    expect(getByTestId(testId).className).toContain(className);
  });

  it('should render with autoFocus', () => {
    const { getByTestId } = customRender(<TextInput {...getProps({ testId, autoFocus: true })} />);

    expect(getByTestId(testId)).toHaveFocus();
  });
});
