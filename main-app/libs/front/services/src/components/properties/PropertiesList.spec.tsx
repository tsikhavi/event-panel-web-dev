import * as hook from '@eventpanel/front/api';
import { mockUsePropertiesList } from '@eventpanel/front/api';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';

import PropertiesList from './PropertiesList';

describe('PropertiesList', () => {
  it('should render children', () => {
    const children = 'children';
    const { getByText } = customRender(
      <PropertiesList workspaceId="workspaceId">{() => <div>{children}</div>}</PropertiesList>
    );

    expect(getByText(children)).toBeInTheDocument();
  });

  it('should call getList', () => {
    const getList = jest.fn();
    jest.spyOn(hook, 'usePropertiesList').mockReturnValue(mockUsePropertiesList({ getList, status: 'success' }));

    const button = 'button';
    const workspaceId = 'workspaceId';
    const { getByText } = customRender(
      <PropertiesList workspaceId={workspaceId}>
        {({ properties: { getList } }) => (
          <button type="button" onClick={getList}>
            {button}
          </button>
        )}
      </PropertiesList>
    );

    fireEvent.click(getByText(button));

    expect(getList).toHaveBeenCalledTimes(1);
    expect(getList).toHaveBeenCalledWith({ workspaceId });
  });
});
