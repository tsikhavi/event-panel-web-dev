import { useCallback } from 'react';

import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useGetWorkspacesList() {
  const { workspaces } = useApi();
  const { error, status, isLoading, makeRequest, response } = useRequest(workspaces.getWorkspacesList);

  const loadWorkspacesList = useCallback(() => {
    makeRequest(null);
  }, [makeRequest]);

  return { workspaces: response || [], loadWorkspacesList, error, status, isLoading };
}
