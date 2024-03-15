import { customRender } from '../../../test-utils';

import WorkspacesList from './WorkspacesList';

describe('WorkspacesList', () => {
  it('should render list', () => {
    const list = 'list';
    const { getByText } = customRender(<WorkspacesList render={() => <div>{list}</div>} />);

    expect(getByText(list)).toBeInTheDocument();
  });
});
