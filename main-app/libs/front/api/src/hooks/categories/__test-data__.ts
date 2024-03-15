import { useCategoriesList } from './useCategoriesList';

type Type = ReturnType<typeof useCategoriesList>;
export const mockUseCategoriesList = (args: Partial<Type> = {}): Type => ({
  list: [],
  getList: async () => {},
  error: null,
  status: 'idle',
  isLoading: false,
  ...args,
});
