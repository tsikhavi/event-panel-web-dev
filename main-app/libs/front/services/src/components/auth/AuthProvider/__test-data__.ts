import { useAuth } from './AuthProvider';

type Type = ReturnType<typeof useAuth>;
export const mockUseAuth = (args: Partial<Type> = {}): Type => ({
  user: null,
  login: () => {},
  logout: () => {},
  ...args,
});
