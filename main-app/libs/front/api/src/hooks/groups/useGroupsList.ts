import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useGroupsList() {
  const { groups } = useApi();
  const { response, makeRequest: getList, ...other } = useRequest(groups.getGroupsList);

  return { list: response || [], getList, ...other };
}
