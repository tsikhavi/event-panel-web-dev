import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function usePropertiesList() {
  const { properties } = useApi();
  const { response, makeRequest, ...other } = useRequest(properties.getPropertiesList);

  return { list: response || [], getList: makeRequest, ...other };
}
