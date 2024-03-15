import React from 'react';
import * as authHook from '@eventpanel/front/api';
import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';
import { FormContainerRenderProps } from '../form/FormContainer';

import CreateProperty, { CreatePropertyProps } from './CreateProperty';

type ResultType = ReturnType<typeof authHook.useCreateProperty>;
const mockCreateProperty = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  property: null,
  error: null,
  status: 'idle',
  isLoading: false,
  createProperty: mockCreateProperty,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useCreateProperty: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<CreatePropertyDto> = {}): CreatePropertyDto => ({
  name: 'Property Name',
  workspaceId: '2d04ecdf-b247-469d-99e0-a0ca1f7f1ab5',
  ...form,
});

const renderForm = (
  control: FormContainerRenderProps<CreatePropertyDto>['control'],
  form: CreatePropertyDto = getForm()
) => {
  control.current.setValue('name', form.name);
  control.current.setValue('description', form.description);
  return <div />;
};

const getProps = (props: Partial<CreatePropertyProps> = {}): CreatePropertyProps => ({
  onSuccess: jest.fn(),
  // ToDo Replace with a function
  workspaceId: '2d04ecdf-b247-469d-99e0-a0ca1f7f1ab5',
  render: ({ field: { control } }) => renderForm(control),
  ...props,
});

describe('CreateProperty', () => {
  it('should render default', () => {
    const test = 'test';
    const props = getProps({ render: () => <div>{test}</div> });
    const { getByText } = customRender(<CreateProperty {...props} />);

    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(getByText(test)).toBeInTheDocument();
  });

  it('should call onSuccess', () => {
    jest
      .spyOn(authHook, 'useCreateProperty')
      .mockReturnValue(getResult({ property: {} as PropertyDto, status: 'success' }));

    const props = getProps();
    customRender(<CreateProperty {...props} />);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  describe('createProperty', () => {
    it('should call when form has NO errors', () => {
      const { getByRole } = customRender(<CreateProperty {...getProps()} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateProperty).toHaveBeenCalledTimes(1);
      expect(mockCreateProperty).toHaveBeenCalledWith(getForm());
    });

    it.each<[string, CreatePropertyDto]>([
      ['name too short', getForm({ name: 'Q' })],
      ['name too long', getForm({ name: new Array(50).fill('Q').join('') })],
    ])('should NOT call when: %s', (_, form) => {
      const props = getProps({ render: ({ field: { control } }) => renderForm(control, form) });
      const { getByRole } = customRender(<CreateProperty {...props} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateProperty).not.toHaveBeenCalled();
    });
  });
});
