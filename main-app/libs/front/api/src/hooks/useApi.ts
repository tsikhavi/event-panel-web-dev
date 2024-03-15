import BaseApi from '../api/base.api';
import CategoriesApi from '../api/endpoints/categories.api';
import EventsApi from '../api/endpoints/events.api';
import GroupsApi from '../api/endpoints/groups.api';
import PropertiesApi from '../api/endpoints/properties.api';
import SourcesApi from '../api/endpoints/sources.api';
import UsersApi from '../api/endpoints/users.api';
import WorkspacesApi from '../api/endpoints/workspaces.api';

export function useApi() {
  //TODO Use .ENV
  const baseApi = new BaseApi('http://localhost:8000/api');

  return {
    users: new UsersApi(baseApi),
    groups: new GroupsApi(baseApi),
    events: new EventsApi(baseApi),
    properties: new PropertiesApi(baseApi),
    categories: new CategoriesApi(baseApi),
    workspaces: new WorkspacesApi(baseApi),
    sources: new SourcesApi(baseApi),
  };
}
