import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useResetPassword() {
  const { users } = useApi();
  const { makeRequest: resetPassword, response: user, error, status, isLoading } = useRequest(users.checkEmail);

  return { resetPassword, user, error, status, isLoading };
}
