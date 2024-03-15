import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useEvent() {
  const { events } = useApi();
  const { response, makeRequest: getEvent, ...other } = useRequest(events.getEventById);

  return { event: response, getEvent, ...other };
}
