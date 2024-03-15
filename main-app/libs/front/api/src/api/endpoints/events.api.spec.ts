import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import axios from 'axios';

import { baseURL } from '../../../jest.setup';
import BaseApi from '../base.api';

import EventsApi from './events.api';

describe('EventsApi', () => {
  let Api: EventsApi;

  const root = '/events';
  const body: CreateEventDto = {
    workspaceId: 'workspaceId',
    name: 'Event Name',
    source_ids: [],
    description: 'Event Description',
  };
  const config = undefined;

  beforeEach(() => {
    Api = new EventsApi(new BaseApi(baseURL));
  });

  it('should make getEventsList request', async () => {
    const workspaceId = 'workspaceId';
    await Api.getEventsList({ workspaceId });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/workspace/${workspaceId}`, config);
  });

  it('should make getEventById request', async () => {
    const eventId = 'eventId';
    await Api.getEventById(eventId);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/${eventId}`, config);
  });

  it('should make createEvent request', async () => {
    await Api.createEvent(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(root, body, config);
  });
});
