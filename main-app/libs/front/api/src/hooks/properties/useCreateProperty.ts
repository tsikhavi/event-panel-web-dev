import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCreateProperty() {
  const { properties } = useApi();
  const { response, makeRequest: createProperty, ...other } = useRequest(properties.createProperty);

  return { property: response, createProperty, ...other };
}
