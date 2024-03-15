import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { UpdateEventDto } from '@eventpanel/shared/dto/events/update-event.dto';

import { workspace } from '../../__test-data__/workspaces.test-data';
import { Event } from '../entities/event.entity';

export const event: Event = {
  workspace,
  id: 'event-id-123',
  name: 'Event Name',
  description: 'Some Event Description',
  sources: [],
};

export const eventsList: Event[] = [
  {
    workspace,
    id: 'event-id-123',
    name: 'Event Name',
    description: 'Some Event Description',
    sources: [],
  },
  {
    workspace,
    id: 'event-id-456',
    name: 'Another Event',
    description: 'Another Event Description',
    sources: [],
  },
];

export const createEvent: CreateEventDto = {
  name: 'New Event',
  description: 'Description for new event',
  source_ids: [],
  workspaceId: 'workspace-id-123',
};

export const updateEvent: UpdateEventDto = {
  name: 'New Event',
  description: 'Description for new event',
  source_ids: [],
};
