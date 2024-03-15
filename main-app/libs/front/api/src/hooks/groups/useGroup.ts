import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useGroup() {
  const { groups } = useApi();
  const { response, makeRequest: getGroup, ...other } = useRequest(groups.getGroupById);

  return { group: response, getGroup, ...other };
}
