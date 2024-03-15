import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';
import { UpdateEventDto } from '@eventpanel/shared/dto/events/update-event.dto';

import { getCreateEventProps, getUpdateEventProps } from '../test-data/events.test-data';

import { getServer } from './test-utils';
import { ErrorType, UseProps } from './types';

type UsePostProps = UseProps & {
  props?: CreateEventDto;
};

type UseGetListProps = UseProps & {
  workspaceId: string;
};

type UseGetProps = UseProps & {
  eventId: string;
};

type UsePutProps = UseProps &
  UseGetProps & {
    props?: UpdateEventDto;
  };

type UseEventResultProps = [EventDto & ErrorType, number];

type UseListEventsResultProps = [EventDto[] & ErrorType, number];

export const usePostEvent = async ({
  app,
  header = ['header', ''],
  props = getCreateEventProps(),
}: UsePostProps): Promise<UseEventResultProps> => {
  const { body, status } = await getServer(app)
    .post('/events')
    .set(...header)
    .send(props);

  return [body as UseEventResultProps[0], status];
};

export const useGetListEvents = async ({
  app,
  workspaceId,
  header = ['header', ''],
}: UseGetListProps): Promise<UseListEventsResultProps> => {
  const { body, status } = await getServer(app)
    .get(`/events/workspace/${workspaceId}`)
    .set(...header);

  return [body as UseListEventsResultProps[0], status];
};

export const useGetEvent = async ({
  app,
  eventId,
  header = ['header', ''],
}: UseGetProps): Promise<UseEventResultProps> => {
  const { body, status } = await getServer(app)
    .get(`/events/${eventId}`)
    .set(...header);

  return [body as UseEventResultProps[0], status];
};

export const usePutEvent = async ({
  app,
  eventId,
  header = ['header', ''],
  props = getUpdateEventProps(),
}: UsePutProps): Promise<UseEventResultProps> => {
  const { body, status } = await getServer(app)
    .put(`/events/${eventId}`)
    .set(...header)
    .send(props);

  return [body as UseEventResultProps[0], status];
};
