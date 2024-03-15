import { useGroupsList } from './useGroupsList';

type Type = ReturnType<typeof useGroupsList>;
export const mockUseGroupsList = (args: Partial<Type> = {}): Type => ({
  list: [],
  getList: async () => {},
  error: null,
  status: 'idle',
  isLoading: false,
  ...args,
});
