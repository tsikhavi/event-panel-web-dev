import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { workspace } from '../__test-data__/workspaces.test-data';
import { WorkspacesService } from '../workspaces/workspaces.service';

import { Property } from './entities/property.entity';
import { createProperty, propertiesList, property, updateProperty } from './test-data/properties.test-data';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let propertiesService: PropertiesService;
  let workspacesService: WorkspacesService;

  const mockWorkspacesService: Partial<WorkspacesService> = {
    findOne: jest.fn().mockResolvedValue(workspace),
  };

  const mockRepository: Partial<Repository<Property>> = {
    create: jest.fn().mockReturnValue(property),
    save: jest.fn().mockResolvedValue(property),
    update: jest.fn().mockResolvedValue(property),
    findOne: jest.fn().mockResolvedValue(property),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        { provide: WorkspacesService, useValue: mockWorkspacesService },
        { provide: getRepositoryToken(Property), useValue: mockRepository },
      ],
    }).compile();

    propertiesService = module.get<PropertiesService>(PropertiesService);
    workspacesService = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should create a new property', async () => {
      const result = await propertiesService.create(createProperty);

      expect(workspacesService.findOne).toHaveBeenCalledWith(createProperty.workspaceId);
      expect(mockRepository.create).toHaveBeenCalledWith({ ...createProperty, workspaceId: undefined });
      expect(mockRepository.save).toHaveBeenCalledWith(property);
      expect(result).toEqual(property);
    });

    it('should throw BadRequestException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      try {
        await propertiesService.create(createProperty);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(mockRepository.create).toHaveBeenCalledTimes(0);
        expect(mockRepository.save).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should return a list of properties', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue({ ...workspace, properties: propertiesList });

      const result = await propertiesService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(propertiesList);
    });

    it('should return an empty list', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue(workspace);

      const result = await propertiesService.findAllByWorkspaceId(workspace.id);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual([]);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(propertiesService.findAllByWorkspaceId(workspace.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a property', async () => {
      const result = await propertiesService.findOne(property.id);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(property);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(propertiesService.findOne(property.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return an updated property', async () => {
      const newProperty = { ...property, ...updateProperty };

      jest.spyOn(propertiesService, 'findOne').mockResolvedValue(property);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(newProperty);

      const result = await propertiesService.update(property.id, updateProperty);

      expect(propertiesService.findOne).toHaveBeenCalledWith(property.id);
      expect(result).toEqual(newProperty);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(propertiesService.findOne(property.id)).rejects.toThrow(NotFoundException);
    });
  });
});
