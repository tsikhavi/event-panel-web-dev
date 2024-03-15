import { customRender, fireEvent } from '../../../../test-utils';

import TextField, { TextFieldProps } from './TextField';

const label = 'email';
const getProps = (props: Partial<TextFieldProps> = {}): TextFieldProps => ({
  label,
  name: 'test',
  value: null,
  onChange: jest.fn(),
  ...props,
});

describe('InputField', () => {
  it('should render default', () => {
    const { getByText, getByLabelText } = customRender(<TextField {...getProps()} />);

    expect(getByText(label)).toBeInTheDocument();
    expect(getByLabelText(label)).toHaveAttribute('type', 'text');
  });

  it('should render error message', () => {
    const message = 'message';
    const { getByText } = customRender(<TextField {...getProps({ error: message })} />);

    expect(getByText(message)).toBeInTheDocument();
  });

  it('should render success message', () => {
    const message = 'message';
    const { getByText } = customRender(<TextField {...getProps({ success: message })} />);

    expect(getByText(message)).toBeInTheDocument();
  });

  it('should render & toggle "Hide Password Button"', () => {
    const { queryByText, getByLabelText } = customRender(<TextField {...getProps({ type: 'password' })} />);

    expect(getByLabelText(label)).toHaveAttribute('type', 'password');
    fireEvent.mouseDown(queryByText(/eye/) as Element);

    expect(getByLabelText(label)).toHaveAttribute('type', 'text');
    fireEvent.mouseDown(queryByText(/eyeSlash/) as Element);

    expect(getByLabelText(label)).toHaveAttribute('type', 'password');
  });
});
