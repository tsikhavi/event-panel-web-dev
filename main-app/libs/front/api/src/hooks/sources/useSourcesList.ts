import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useSourcesList() {
  const { sources } = useApi();
  const { response, makeRequest: getList, ...other } = useRequest(sources.getSourcesList);

  return { list: response || [], getList, ...other };
}
