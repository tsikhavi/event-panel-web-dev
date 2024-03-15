import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCreateWorkspace() {
  const { workspaces } = useApi();
  const {
    error,
    status,
    isLoading,
    response: data,
    makeRequest: createWorkspace,
  } = useRequest(workspaces.createWorkspace);

  return { createWorkspace, data, error, status, isLoading };
}
