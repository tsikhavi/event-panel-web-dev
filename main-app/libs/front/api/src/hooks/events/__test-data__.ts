import { useEventsList } from './useEventsList';

type Type = ReturnType<typeof useEventsList>;
export const mockUseEventsList = (args: Partial<Type> = {}): Type => ({
  list: [],
  getList: async () => {},
  error: null,
  status: 'idle',
  isLoading: false,
  ...args,
});
