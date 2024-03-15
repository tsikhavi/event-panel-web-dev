import { useApi } from '../useApi';
import { useRequest } from '../useRequest';

export function useEventsList() {
  const { events } = useApi();
  const { response, makeRequest: getList, ...other } = useRequest(events.getEventsList);

  return { list: response || [], getList, ...other };
}
