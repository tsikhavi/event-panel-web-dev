import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useSignIn() {
  const { users } = useApi();
  const { makeRequest: signIn, response: user, error, status, isLoading } = useRequest(users.signIn);

  return { signIn, user, error, status, isLoading };
}
