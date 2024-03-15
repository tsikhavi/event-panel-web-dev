import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useSignUp() {
  const { users } = useApi();
  const { makeRequest: signUp, response: user, error, status, isLoading } = useRequest(users.signUp);

  return { signUp, user, error, status, isLoading };
}
