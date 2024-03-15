import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { user } from '../__test-data__/users.test-data';
import {
  source,
  sourcesList,
  workspace,
  workspaceCreate,
  workspacesList,
  workspaceUpdate,
} from '../__test-data__/workspaces.test-data';
import { Source } from '../sources/entities/source.entity';

import { Workspace } from './entities/workspace.entity';
import { WorkspacesService } from './workspaces.service';

describe('WorkspacesService', () => {
  let workspacesService: WorkspacesService;

  const mockRepository: Partial<Repository<Workspace>> = {
    create: jest.fn().mockReturnValue(workspace),
    save: jest.fn().mockResolvedValue(workspace),
    findOne: jest.fn().mockResolvedValue(workspace),
    find: jest.fn().mockResolvedValue(workspacesList),
  };

  const mockSourceRepository: Partial<Repository<Source>> = {
    create: jest.fn().mockReturnValue(source),
    save: jest.fn().mockResolvedValue(source),
    findOne: jest.fn().mockResolvedValue(source),
    find: jest.fn().mockResolvedValue(sourcesList),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        { provide: getRepositoryToken(Workspace), useValue: mockRepository },
        { provide: getRepositoryToken(Source), useValue: mockSourceRepository },
      ],
    }).compile();

    workspacesService = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should create a new workspace', async () => {
      const result = await workspacesService.create(workspaceCreate, user);

      expect(mockRepository.create).toHaveBeenCalledWith({ name: workspaceCreate.name });
      expect(mockRepository.save).toHaveBeenCalledWith(workspace);
      expect(result).toEqual(workspace);
    });
  });

  describe('findAll', () => {
    it('should return a list of workspaces', async () => {
      const result = await workspacesService.findAll('userId');

      expect(result).toEqual(workspacesList);
    });

    it('should return an empty list', async () => {
      jest.spyOn(workspacesService, 'findAll').mockResolvedValue([]);

      const result = await workspacesService.findAll('userId');

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should find a workspace by id', async () => {
      const result = await workspacesService.findOne(workspace.id);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(workspace);
    });

    it('should throw a NotFoundException when workspace is not found', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(workspacesService.findOne(workspace.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should find and update a workspace', async () => {
      const newWorkspace = { ...workspace, ...workspaceUpdate };

      jest.spyOn(workspacesService, 'findOne').mockResolvedValue(workspace);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(newWorkspace);

      const result = await workspacesService.update(workspace.id, workspaceUpdate);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(mockRepository.save).toHaveBeenCalledWith(newWorkspace);
      expect(result).toEqual(newWorkspace);
    });

    it('should throw NotFoundException when workspace is not found', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(workspacesService.update(workspace.id, workspaceUpdate)).rejects.toThrow(NotFoundException);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });
  });
});
