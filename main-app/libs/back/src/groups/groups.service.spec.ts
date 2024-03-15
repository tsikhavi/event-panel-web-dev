import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { workspace } from '../__test-data__/workspaces.test-data';
import { WorkspacesService } from '../workspaces/workspaces.service';

import { Group } from './entities/group.entity';
import { createGroup, group, groupsList, updateGroup } from './test-data/groups.test-data';
import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let groupsService: GroupsService;
  let workspacesService: WorkspacesService;

  const mockWorkspacesService: Partial<WorkspacesService> = {
    findOne: jest.fn().mockResolvedValue(workspace),
  };

  const mockRepository: Partial<Repository<Group>> = {
    create: jest.fn().mockReturnValue(group),
    save: jest.fn().mockResolvedValue(group),
    update: jest.fn().mockResolvedValue(group),
    findOne: jest.fn().mockResolvedValue(group),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: WorkspacesService, useValue: mockWorkspacesService },
        { provide: getRepositoryToken(Group), useValue: mockRepository },
      ],
    }).compile();

    groupsService = module.get<GroupsService>(GroupsService);
    workspacesService = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const result = await groupsService.create(createGroup);

      expect(workspacesService.findOne).toHaveBeenCalledWith(createGroup.workspaceId);
      expect(mockRepository.create).toHaveBeenCalledWith({ ...createGroup, workspaceId: undefined });
      expect(mockRepository.save).toHaveBeenCalledWith(group);
      expect(result).toEqual(group);
    });

    it('should throw BadRequestException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      try {
        await groupsService.create(createGroup);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(mockRepository.create).toHaveBeenCalledTimes(0);
        expect(mockRepository.save).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should return a list of groups', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue({ ...workspace, groups: groupsList });

      const result = await groupsService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(groupsList);
    });

    it('should return an empty list', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue(workspace);

      const result = await groupsService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual([]);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(groupsService.findAllByWorkspaceId(workspace.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a group', async () => {
      const result = await groupsService.findOne(group.id);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(group);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(groupsService.findOne(group.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return an updated group', async () => {
      const newGroup = { ...group, ...updateGroup };

      jest.spyOn(groupsService, 'findOne').mockResolvedValue(group);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(newGroup);

      const result = await groupsService.update(group.id, updateGroup);

      expect(groupsService.findOne).toHaveBeenCalledWith(group.id);
      expect(result).toEqual(newGroup);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(groupsService.findOne(group.id)).rejects.toThrow(NotFoundException);
    });
  });
});
