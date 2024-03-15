import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

const property: Omit<PropertyDto, 'id'> = {
  name: 'Property Name',
  description: 'Description Name',
  workspaceId: 'workspaceId',
};

export const getPropertiesList = (amount: number): PropertyDto[] =>
  new Array(amount).fill(property).map((property, id) => ({ ...property, id }));
