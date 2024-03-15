import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';

import BaseApi from '../base.api';
import { GetEventsListDTO } from '../dto';

class EventsApi {
  constructor(private baseApi: BaseApi) {}

  baseUrl = '/events';

  getEventsList = async ({ workspaceId }: GetEventsListDTO) => {
    const url = `${this.baseUrl}/workspace/${workspaceId}`;
    const { data } = await this.baseApi.get<EventDto[]>(url);
    return data;
  };

  getEventById = async (eventId: string) => {
    const url = `${this.baseUrl}/${eventId}`;
    const { data } = await this.baseApi.get<EventDto>(url);
    return data;
  };

  createEvent = async (body: CreateEventDto) => {
    const { data } = await this.baseApi.post<EventDto, CreateEventDto>(this.baseUrl, body);
    return data;
  };
}

export default EventsApi;
