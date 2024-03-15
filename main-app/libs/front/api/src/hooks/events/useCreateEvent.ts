import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useCreateEvent() {
  const { events } = useApi();
  const { response, makeRequest: createEvent, ...other } = useRequest(events.createEvent);

  return { event: response, createEvent, ...other };
}
