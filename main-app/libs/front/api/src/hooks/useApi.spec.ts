import CategoriesApi from '../api/endpoints/categories.api';
import EventsApi from '../api/endpoints/events.api';
import GroupsApi from '../api/endpoints/groups.api';
import PropertiesApi from '../api/endpoints/properties.api';
import UsersApi from '../api/endpoints/users.api';
import WorkspacesApi from '../api/endpoints/workspaces.api';

import { useApi } from './useApi';

describe('useApi', () => {
  it('should return api', () => {
    const api = useApi();

    expect(api.users).toBeInstanceOf(UsersApi);
    expect(api.groups).toBeInstanceOf(GroupsApi);
    expect(api.events).toBeInstanceOf(EventsApi);
    expect(api.categories).toBeInstanceOf(CategoriesApi);
    expect(api.properties).toBeInstanceOf(PropertiesApi);
    expect(api.workspaces).toBeInstanceOf(WorkspacesApi);
  });
});
