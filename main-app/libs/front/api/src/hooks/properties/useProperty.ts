import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useProperty() {
  const { properties } = useApi();
  const { response, makeRequest: getProperty, ...other } = useRequest(properties.getPropertyById);

  return { property: response, getProperty, ...other };
}
