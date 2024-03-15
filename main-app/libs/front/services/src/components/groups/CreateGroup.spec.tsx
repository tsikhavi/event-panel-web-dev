import React from 'react';
import * as authHook from '@eventpanel/front/api';
import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';
import { FormContainerRenderProps } from '../form/FormContainer';

import CreateGroup, { CreateGroupProps } from './CreateGroup';

type ResultType = ReturnType<typeof authHook.useCreateGroup>;
const mockCreateGroup = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  group: null,
  error: null,
  status: 'idle',
  isLoading: false,
  createGroup: mockCreateGroup,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useCreateGroup: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<CreateGroupDto> = {}): CreateGroupDto => ({
  name: 'Group Name',
  workspaceId: '2d04ecdf-b247-469d-99e0-a0ca1f7f1ab5',
  ...form,
});

const renderForm = (control: FormContainerRenderProps<CreateGroupDto>['control'], form: CreateGroupDto = getForm()) => {
  control.current.setValue('name', form.name);
  control.current.setValue('description', form.description);
  return <div />;
};

const getProps = (props: Partial<CreateGroupProps> = {}): CreateGroupProps => ({
  onSuccess: jest.fn(),
  workspaceId: '2d04ecdf-b247-469d-99e0-a0ca1f7f1ab5',
  render: ({ field: { control } }) => renderForm(control),
  ...props,
});

describe('CreateGroup', () => {
  it('should render default', () => {
    const test = 'test';
    const props = getProps({ render: () => <div>{test}</div> });
    const { getByText } = customRender(<CreateGroup {...props} />);

    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(getByText(test)).toBeInTheDocument();
  });

  it('should call onSuccess', () => {
    jest.spyOn(authHook, 'useCreateGroup').mockReturnValue(getResult({ group: {} as GroupDto, status: 'success' }));

    const props = getProps();
    customRender(<CreateGroup {...props} />);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  describe('createGroup', () => {
    it('should call when form has NO errors', () => {
      const { getByRole } = customRender(<CreateGroup {...getProps()} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateGroup).toHaveBeenCalledTimes(1);
      expect(mockCreateGroup).toHaveBeenCalledWith(getForm());
    });

    it.each<[string, CreateGroupDto]>([
      ['name too short', getForm({ name: 'Q' })],
      ['name too long', getForm({ name: new Array(50).fill('Q').join('') })],
    ])('should NOT call when: %s', (_, form) => {
      const props = getProps({ render: ({ field: { control } }) => renderForm(control, form) });
      const { getByRole } = customRender(<CreateGroup {...props} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateGroup).not.toHaveBeenCalled();
    });
  });
});
