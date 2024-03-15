import { customRender, fireEvent } from '../../../../test-utils';

import WorkspacesList, { WorkspacesListProps } from './WorkspacesList';

const children = 'children';
const getProps = (props: Partial<WorkspacesListProps> = {}): WorkspacesListProps => ({
  onAddWorkspace: jest.fn(),
  children: <WorkspacesList.Item>{children}</WorkspacesList.Item>,
  ...props,
});

describe('WorkspacesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render default', () => {
    const props = getProps();
    const { getByText, queryByText } = customRender(<WorkspacesList {...props} />);

    expect(queryByText(/add/)).toBeInTheDocument();
    expect(getByText(children)).toBeInTheDocument();
  });

  it('should call onClick', () => {
    const onClick = jest.fn();
    const props = getProps({ children: <WorkspacesList.Item onClick={onClick}>{children}</WorkspacesList.Item> });
    const { getByText } = customRender(<WorkspacesList {...props}></WorkspacesList>);

    fireEvent.click(getByText(children));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call onAddWorkspace on click', () => {
    const props = getProps();
    const { queryByText } = customRender(<WorkspacesList {...props} />);

    fireEvent.click(queryByText(/add/) as Element);
    expect(props.onAddWorkspace).toHaveBeenCalledTimes(1);
  });
});
