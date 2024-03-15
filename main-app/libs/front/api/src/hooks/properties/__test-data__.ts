import { usePropertiesList } from './usePropertiesList';

type Type = ReturnType<typeof usePropertiesList>;
export const mockUsePropertiesList = (args: Partial<Type> = {}): Type => ({
  list: [],
  getList: async () => {},
  error: null,
  status: 'idle',
  isLoading: false,
  ...args,
});
