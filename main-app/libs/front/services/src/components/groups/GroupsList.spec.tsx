import * as hook from '@eventpanel/front/api';
import { mockUseGroupsList } from '@eventpanel/front/api';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';

import GroupsList from './GroupsList';

describe('GroupsList', () => {
  it('should render children', () => {
    const children = 'children';
    const { getByText } = customRender(
      <GroupsList workspaceId="workspaceId">{() => <div>{children}</div>}</GroupsList>
    );

    expect(getByText(children)).toBeInTheDocument();
  });

  it('should call getList', () => {
    const getList = jest.fn();
    jest.spyOn(hook, 'useGroupsList').mockReturnValue(mockUseGroupsList({ getList, status: 'success' }));

    const button = 'button';
    const workspaceId = 'workspaceId';
    const { getByText } = customRender(
      <GroupsList workspaceId={workspaceId}>
        {({ groups: { getList } }) => (
          <button type="button" onClick={getList}>
            {button}
          </button>
        )}
      </GroupsList>
    );

    fireEvent.click(getByText(button));

    expect(getList).toHaveBeenCalledTimes(1);
    expect(getList).toHaveBeenCalledWith({ workspaceId });
  });
});
