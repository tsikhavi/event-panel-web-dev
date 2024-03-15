import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { sourcesList, workspace } from '../__test-data__/workspaces.test-data';
import { SourcesService } from '../sources/sources.service';
import { WorkspacesService } from '../workspaces/workspaces.service';

import { Event } from './entities/event.entity';
import { createEvent, event, eventsList, updateEvent } from './test-data/events.test-data';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let workspacesService: WorkspacesService;

  const mockWorkspacesService: Partial<WorkspacesService> = {
    findOne: jest.fn().mockResolvedValue(workspace),
  };

  const mockSourcesService: Partial<SourcesService> = {
    findAllByIds: jest.fn().mockReturnValue(sourcesList),
  };

  const mockRepository: Partial<Repository<Event>> = {
    create: jest.fn().mockReturnValue(event),
    save: jest.fn().mockResolvedValue(event),
    update: jest.fn().mockResolvedValue(event),
    findOne: jest.fn().mockResolvedValue(event),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: WorkspacesService, useValue: mockWorkspacesService },
        { provide: SourcesService, useValue: mockSourcesService },
        { provide: getRepositoryToken(Event), useValue: mockRepository },
      ],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    workspacesService = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const result = await eventsService.create(createEvent);

      expect(workspacesService.findOne).toHaveBeenCalledWith(createEvent.workspaceId);
      expect(mockRepository.create).toHaveBeenCalledWith({ ...createEvent, workspaceId: undefined });
      expect(mockRepository.save).toHaveBeenCalledWith(event);
      expect(result).toEqual(event);
    });

    it('should throw BadRequestException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      try {
        await eventsService.create(createEvent);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(mockRepository.create).toHaveBeenCalledTimes(0);
        expect(mockRepository.save).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should return a list of events', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue({ ...workspace, events: eventsList });

      const result = await eventsService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(eventsList);
    });

    it('should return an empty list', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue(workspace);

      const result = await eventsService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual([]);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(eventsService.findAllByWorkspaceId(workspace.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a event', async () => {
      const result = await eventsService.findOne(event.id);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(event);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(eventsService.findOne(event.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return an updated event', async () => {
      const newEvent = { ...event, ...updateEvent };

      jest.spyOn(eventsService, 'findOne').mockResolvedValue(event);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(newEvent);

      const result = await eventsService.update(event.id, updateEvent);

      expect(eventsService.findOne).toHaveBeenCalledWith(event.id);
      expect(result).toEqual(newEvent);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(eventsService.findOne(event.id)).rejects.toThrow(NotFoundException);
    });
  });
});
