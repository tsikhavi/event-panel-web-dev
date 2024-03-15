import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { UpdatePropertyDto } from '@eventpanel/shared/dto/properties/update-property.dto';

import { workspace } from '../../__test-data__/workspaces.test-data';
import { Property } from '../entities/property.entity';

export const property: Property = {
  workspace,
  id: 'property-id-123',
  name: 'Property Name',
  description: 'Some Property Description',
};

export const propertiesList: Property[] = [
  {
    workspace,
    id: 'property-id-123',
    name: 'Property Name',
    description: 'Some Property Description',
  },
  {
    workspace,
    id: 'property-id-456',
    name: 'Property Name',
    description: 'Another Property Description',
  },
];

export const createProperty: CreatePropertyDto = {
  name: 'New Property',
  description: 'Description for new property',
  workspaceId: 'workspace-id-123',
};

export const updateProperty: UpdatePropertyDto = {
  name: 'Update Property',
  description: 'Description for new property',
};
