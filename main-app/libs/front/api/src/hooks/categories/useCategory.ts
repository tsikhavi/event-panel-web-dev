import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCategory() {
  const { categories } = useApi();
  const { response, makeRequest: getCategory, ...other } = useRequest(categories.getCategoryById);

  return { category: response, getCategory, ...other };
}
