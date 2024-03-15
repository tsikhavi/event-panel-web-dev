import { customRender, fireEvent } from '../../../../test-utils';

import Modal, { ModalContainerProps } from './Modal';

const getProps = (props: Partial<ModalContainerProps> = {}): ModalContainerProps => ({
  isOpen: true,
  children: 'Modal',
  onClose: jest.fn(),
  ...props,
});

describe('Modal', () => {
  it('should render default', () => {
    const props = getProps();
    const { getByText } = customRender(<Modal {...props} />);

    expect(getByText(String(props.children))).toBeInTheDocument();
    expect(getByText(String(props.children)).className).toContain('center');
  });

  it('should render with className', () => {
    const className = 'className';
    const props = getProps({ className });
    const { getByText } = customRender(<Modal {...props} />);

    expect(getByText(String(props.children)).className).toContain(className);
  });

  it('should NOT render when isOpen false', () => {
    const props = getProps({ isOpen: false });
    const { queryByText } = customRender(<Modal {...props} />);

    expect(queryByText(String(props.children))).not.toBeInTheDocument();
  });

  describe('onClose', () => {
    it('should NOT call on children click', () => {
      const children = 'children';
      const props = getProps({ children: <div>{children}</div> });
      const { getByText } = customRender(<Modal {...props} />);

      fireEvent.click(getByText(children));
      expect(props.onClose).toHaveBeenCalledTimes(0);
    });

    it('should call on SELF click', () => {
      const children = 'children';
      const props = getProps({ children: <div>{children}</div> });
      const { getByText } = customRender(<Modal {...props} />);

      fireEvent.click(getByText(children).parentElement as Element);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
