import { customRender, fireEvent } from '../../../../test-utils';

import SideModal, { SideModalProps } from './SideModal';

const getProps = (props: Partial<SideModalProps> = {}): SideModalProps => ({
  isOpen: true,
  onClose: jest.fn(),
  children: 'Side Modal',
  ...props,
});

describe('SideModal', () => {
  it('should render open modal', () => {
    const props = getProps();
    const { getByText } = customRender(<SideModal {...props} />);

    expect(getByText(String(props.children))).toBeInTheDocument();
  });

  it('should NOT render when isOpen false', () => {
    const props = getProps({ isOpen: false });
    const { queryByText } = customRender(<SideModal {...props} />);

    expect(queryByText(String(props.children))).not.toBeInTheDocument();
  });

  it('should should call on Cross button click', () => {
    const props = getProps();
    const { queryByText } = customRender(<SideModal {...props} />);

    fireEvent.click(queryByText(/cross/) as Element);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should render with Header', () => {
    const header = 'Header';
    const { getByText } = customRender(<SideModal {...getProps({ Header: header })} />);

    expect(getByText(header)).toBeInTheDocument();
  });
});
