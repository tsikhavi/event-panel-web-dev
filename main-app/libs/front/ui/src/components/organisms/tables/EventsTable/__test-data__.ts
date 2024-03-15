import { EventDto } from '@eventpanel/shared/dto/events/event.dto';

const event: Omit<EventDto, 'id'> = {
  name: 'Share Button Tap',
  description: 'A share button has been tapped',
  sources: [],
  workspaceId: 'workspaceId',
};

export const getEventsList = (amount: number): EventDto[] =>
  new Array(amount).fill(event).map((event, index) => ({ ...event, id: index }));
