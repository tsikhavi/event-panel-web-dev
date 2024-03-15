import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import axios from 'axios';

import { baseURL } from '../../../jest.setup';
import BaseApi from '../base.api';

import PropertiesApi from './properties.api';

describe('PropertiesApi', () => {
  let Api: PropertiesApi;

  const root = '/properties';
  const body: CreatePropertyDto = {
    workspaceId: 'workspaceId',
    name: 'Property Name',
    description: 'Property Description',
  };
  const config = undefined;

  beforeEach(() => {
    Api = new PropertiesApi(new BaseApi(baseURL));
  });

  it('should make getPropertiesList request', async () => {
    const workspaceId = 'workspaceId';
    await Api.getPropertiesList({ workspaceId });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/workspace/${workspaceId}`, config);
  });

  it('should make getPropertyById request', async () => {
    const propertyId = 'propertyId';
    await Api.getPropertyById(propertyId);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${root}/${propertyId}`, config);
  });

  it('should make createProperty request', async () => {
    await Api.createProperty(body);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(root, body, config);
  });
});
