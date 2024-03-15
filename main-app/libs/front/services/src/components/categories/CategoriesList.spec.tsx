import * as hook from '@eventpanel/front/api';
import { mockUseCategoriesList } from '@eventpanel/front/api';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';

import CategoriesList from './CategoriesList';

describe('CategoriesList', () => {
  it('should render children', () => {
    const children = 'children';
    const { getByText } = customRender(
      <CategoriesList workspaceId="workspaceId">{() => <div>{children}</div>}</CategoriesList>
    );

    expect(getByText(children)).toBeInTheDocument();
  });

  it('should call getList', () => {
    const getList = jest.fn();
    jest.spyOn(hook, 'useCategoriesList').mockReturnValue(mockUseCategoriesList({ getList, status: 'success' }));

    const button = 'button';
    const workspaceId = 'workspaceId';
    const { getByText } = customRender(
      <CategoriesList workspaceId={workspaceId}>
        {({ categories: { getList } }) => (
          <button type="button" onClick={getList}>
            {button}
          </button>
        )}
      </CategoriesList>
    );

    fireEvent.click(getByText(button));

    expect(getList).toHaveBeenCalledTimes(1);
    expect(getList).toHaveBeenCalledWith({ workspaceId });
  });
});
