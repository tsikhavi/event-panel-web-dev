import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCategoriesList() {
  const { categories } = useApi();
  const { response, makeRequest: getList, ...other } = useRequest(categories.getCategoriesList);

  return { list: response || [], getList, ...other };
}
