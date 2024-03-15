import { Test, TestingModule } from '@nestjs/testing';

import { workspace } from '../__test-data__/workspaces.test-data';

import { createProperty, propertiesList, property } from './test-data/properties.test-data';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

describe('PropertiesController', () => {
  let propertiesController: PropertiesController;
  let propertiesService: PropertiesService;

  const mockPropertiesService: Partial<PropertiesService> = {
    create: jest.fn().mockResolvedValue(property),
    update: jest.fn().mockResolvedValue(property),
    findOne: jest.fn().mockResolvedValue(property),
    findAllByWorkspaceId: jest.fn().mockResolvedValue(propertiesList),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [PropertiesService, { provide: PropertiesService, useValue: mockPropertiesService }],
    }).compile();

    propertiesController = module.get<PropertiesController>(PropertiesController);
    propertiesService = module.get<PropertiesService>(PropertiesService);
  });

  describe('create', () => {
    it('should call propertiesService.create and return the result', async () => {
      const result = await propertiesController.create(createProperty);

      expect(propertiesService.create).toHaveBeenCalledWith(createProperty);
      expect(result).toEqual(property);
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should call propertiesService.findAllByWorkspaceId and return the result', async () => {
      const result = await propertiesController.findAllByWorkspaceId(workspace.id);

      expect(propertiesService.findAllByWorkspaceId).toHaveBeenCalledWith(workspace.id);
      expect(result).toEqual(propertiesList);
    });
  });

  describe('findOne', () => {
    it('should call propertiesService.findOne and return the result', async () => {
      const result = await propertiesController.findOne(property.id);

      expect(propertiesService.findOne).toHaveBeenCalledWith(property.id);
      expect(result).toEqual(property);
    });
  });

  describe('update', () => {
    it('should call propertiesService.update and return the result', async () => {
      const propertyId = 'property-id-123';
      const result = await propertiesController.update(propertyId, createProperty);

      expect(propertiesService.update).toHaveBeenCalledWith(propertyId, createProperty);
      expect(result).toEqual(property);
    });
  });
});
