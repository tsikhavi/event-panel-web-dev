import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useChangePassword() {
  const { users } = useApi();
  const { makeRequest: changePassword, response: user, error, status, isLoading } = useRequest(users.changePassword);

  return { changePassword, user, error, status, isLoading };
}
