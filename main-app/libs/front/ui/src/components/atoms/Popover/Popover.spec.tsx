import { act } from 'react-dom/test-utils';

import { customRender, fireEvent } from '../../../test-utils';

import Popover, { PopoverProps } from './Popover';

const getProps = (props: Partial<PopoverProps> = {}): PopoverProps => ({
  isOpen: true,
  onClose: jest.fn(),
  anchor: 'anchor',
  children: 'children',
  ...props,
});

describe('Popover', () => {
  it('should render anchor AND children', async () => {
    const props = getProps();
    const { getByText } = customRender(<Popover {...props} />);

    await act(async () => {});

    expect(getByText(String(props.anchor))).toBeInTheDocument();
    expect(getByText(String(props.children))).toBeInTheDocument();
  });

  it('should NOT render children when isOpen false', async () => {
    const props = getProps({ isOpen: false });
    const { getByText, queryByText } = customRender(<Popover {...props} />);

    await act(async () => {});

    expect(getByText(String(props.anchor))).toBeInTheDocument();
    expect(queryByText(String(props.children))).not.toBeInTheDocument();
  });

  it('should render with className', async () => {
    const props = getProps({ className: 'className' });
    const { getByText } = customRender(<Popover {...props} />);

    await act(async () => {});

    expect(getByText(String(props.children)).parentElement?.className).toContain(props.className);
  });

  it('should call onClose when click outside', async () => {
    const outer = 'Outer';
    const props = getProps();
    const { getByText } = customRender(
      <>
        <Popover {...props} />
        <div>{outer}</div>
      </>
    );

    await act(async () => {});

    fireEvent.click(getByText(String(props.children)));
    expect(props.onClose).not.toHaveBeenCalled();

    fireEvent.click(getByText(outer));
    expect(props.onClose).toHaveBeenCalled();
  });
});
