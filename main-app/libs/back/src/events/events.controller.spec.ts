import { Test, TestingModule } from '@nestjs/testing';

import { workspace } from '../__test-data__/workspaces.test-data';

import { createEvent, event, eventsList, updateEvent } from './test-data/events.test-data';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;

  const mockEventsService: Partial<EventsService> = {
    create: jest.fn().mockResolvedValue(event),
    update: jest.fn().mockResolvedValue(event),
    findOne: jest.fn().mockResolvedValue(event),
    findAllByWorkspaceId: jest.fn().mockResolvedValue(eventsList),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, { provide: EventsService, useValue: mockEventsService }],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
  });

  describe('create', () => {
    it('should call eventsService.create and return the result', async () => {
      const result = await eventsController.create(createEvent);

      expect(eventsService.create).toHaveBeenCalledWith(createEvent);
      expect(result).toEqual(event);
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should call eventsService.findAllByWorkspaceId and return the result', async () => {
      const result = await eventsController.findAllByWorkspaceId(workspace.id);

      expect(eventsService.findAllByWorkspaceId).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(eventsList);
    });
  });

  describe('findOne', () => {
    it('should call eventsService.findOne and return the result', async () => {
      const result = await eventsController.findOne(event.id);

      expect(eventsService.findOne).toHaveBeenCalledWith(event.id);
      expect(result).toEqual(event);
    });
  });

  describe('update', () => {
    it('should call eventsService.update and return the result', async () => {
      const eventId = 'event-id-123';
      const result = await eventsController.update(eventId, updateEvent);

      expect(eventsService.update).toHaveBeenCalledWith(eventId, updateEvent);
      expect(result).toEqual(event);
    });
  });
});
