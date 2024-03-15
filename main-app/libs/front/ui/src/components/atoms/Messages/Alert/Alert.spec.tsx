import { customRender, fireEvent } from '../../../../test-utils';

import Alert, { AlertProps, Variants } from './Alert';

const getProps = (props: Partial<AlertProps> = {}): AlertProps => ({
  message: 'Alert Component',
  ...props,
});

describe('Alert', () => {
  it('should renders default', () => {
    const props = getProps();
    const { getByText } = customRender(<Alert {...props} />);

    expect(getByText(props.message)).toBeInTheDocument();
  });

  it('should renders with Header', () => {
    const header = 'Header';
    const { getByText } = customRender(<Alert {...getProps({ header })} />);

    expect(getByText(header)).toBeInTheDocument();
  });

  it('should renders with close button', () => {
    const props = getProps({ closeButton: true });
    const { queryByText } = customRender(<Alert {...props} />);

    expect(queryByText(/cross/)).toBeInTheDocument();

    fireEvent.click(queryByText(/cross/) as Element);
    expect(queryByText(props.message)).not.toBeInTheDocument();
  });

  it.each<[Variants, RegExp]>([
    ['info', /infoCircle/],
    ['error', /danger/],
    ['success', /tickSquare/],
  ])('should render Alert with variant: %s', (variant, icon) => {
    const props = getProps({ variant });
    const { queryByText, getByText } = customRender(<Alert {...props} />);

    expect(queryByText(icon)).toBeInTheDocument();
    expect(queryByText(icon)?.parentElement?.className).toContain(`${variant}Icon`);
    expect(getByText(props.message)?.parentElement?.parentElement?.className).toContain(variant);
  });
});
