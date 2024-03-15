import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCreateCategory() {
  const { categories } = useApi();
  const { response, makeRequest: createCategory, ...other } = useRequest(categories.createCategory);

  return { category: response, createCategory, ...other };
}
