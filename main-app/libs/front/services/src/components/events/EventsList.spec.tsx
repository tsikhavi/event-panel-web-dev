import * as hook from '@eventpanel/front/api';
import { mockUseEventsList } from '@eventpanel/front/api';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';

import EventsList from './EventsList';

describe('EventsList', () => {
  it('should render default', () => {
    const children = 'children';
    const { getByText } = customRender(
      <EventsList workspaceId="workspaceId">{() => <div>{children}</div>}</EventsList>
    );

    expect(getByText(children)).toBeInTheDocument();
  });

  it('should call getList', () => {
    const getList = jest.fn();
    jest.spyOn(hook, 'useEventsList').mockReturnValue(mockUseEventsList({ getList, status: 'success' }));

    const button = 'button';
    const workspaceId = 'workspaceId';
    const { getByText } = customRender(
      <EventsList workspaceId={workspaceId}>
        {({ events: { getList } }) => (
          <button type="button" onClick={getList}>
            {button}
          </button>
        )}
      </EventsList>
    );

    fireEvent.click(getByText(button));

    expect(getList).toHaveBeenCalledTimes(1);
    expect(getList).toHaveBeenCalledWith({ workspaceId });
  });
});
