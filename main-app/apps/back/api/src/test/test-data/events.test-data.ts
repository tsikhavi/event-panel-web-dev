import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';
import { UpdateEventDto } from '@eventpanel/shared/dto/events/update-event.dto';

import { getLorem, getUUID } from '../test-utils/test-utils';

export const getCreateEventProps = (props: Partial<CreateEventDto> = {}): CreateEventDto => ({
  name: 'Jedi Event',
  description: 'May the Force be with You',
  source_ids: [],
  workspaceId: getUUID(),
  ...props,
});

export const getUpdateEventProps = (props: Partial<UpdateEventDto> = {}): UpdateEventDto => ({
  name: 'Jedi Event',
  description: 'May the Force be with You',
  source_ids: [],
  ...props,
});

export const getEventProps = (props: Partial<Omit<EventDto, 'id'>> = {}): Omit<EventDto, 'id' | 'workspaceId'> => ({
  name: 'Jedi Event',
  description: 'May the Force be with You',
  sources: [],
  ...props,
});

export const getCreateEventResultCases: {
  case: string;
  props: CreateEventDto;
  result: Omit<EventDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getCreateEventProps(),
    result: getEventProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getCreateEventProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getEventProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getCreateEventProps({ description: '' }),
    result: getEventProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getCreateEventProps({ description: '    May not spaces be with You    ' }),
    result: getEventProps({ description: 'May not spaces be with You' }),
  },
];

export const getUpdateEventResultCases: {
  case: string;
  props: UpdateEventDto;
  result: Omit<EventDto, 'id' | 'workspaceId'>;
}[] = [
  {
    case: 'default body',
    props: getUpdateEventProps(),
    result: getEventProps(),
  },
  {
    case: 'name string has spaces around it',
    props: getUpdateEventProps({ name: '    Obi-Wan Kenobi    ' }),
    result: getEventProps({ name: 'Obi-Wan Kenobi' }),
  },
  {
    case: 'description is empty string',
    props: getUpdateEventProps({ description: '' }),
    result: getEventProps({ description: '' }),
  },
  {
    case: 'description string has spaces around it',
    props: getUpdateEventProps({ description: '    May not spaces be with You    ' }),
    result: getEventProps({ description: 'May not spaces be with You' }),
  },
];

export const getCreateEventErrorCases: { case: string; props: CreateEventDto; error: string }[] = [
  {
    case: 'name is null',
    props: getCreateEventProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getCreateEventProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getCreateEventProps({ name: 'Very long name of event, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getCreateEventProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
  {
    case: 'workspaceId is null',
    props: getCreateEventProps({ workspaceId: null }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is 123',
    props: getCreateEventProps({ workspaceId: '123' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId not of UUID format',
    props: getCreateEventProps({ workspaceId: 'not-uuid' }),
    error: 'workspaceId must be a UUID',
  },
  {
    case: 'workspaceId is random UUID',
    props: getCreateEventProps({ workspaceId: getUUID() }),
    error: 'workspace not found',
  },
];

export const getUpdateEventErrorCases: { case: string; props: UpdateEventDto; error: string }[] = [
  {
    case: 'name is null',
    props: getUpdateEventProps({ name: null }),
    error: 'name must be a string',
  },
  {
    case: 'name is empty string',
    props: getUpdateEventProps({ name: '' }),
    error: 'name must be longer than or equal to 3 characters',
  },
  {
    case: 'name is too long',
    props: getUpdateEventProps({ name: 'Very long name of event, to check validation and get error' }),
    error: 'name must be shorter than or equal to 48 characters',
  },
  {
    case: 'description is too long',
    props: getUpdateEventProps({ description: getLorem(5) }),
    error: 'description must be shorter than or equal to 1000 characters',
  },
];
