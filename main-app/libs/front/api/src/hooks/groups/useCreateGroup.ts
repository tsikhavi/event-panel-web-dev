import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCreateGroup() {
  const { groups } = useApi();
  const { response, makeRequest: createGroup, ...other } = useRequest(groups.createGroup);

  return { group: response, createGroup, ...other };
}
