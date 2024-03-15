import React from 'react';
import * as apiHook from '@eventpanel/front/api';
import * as authHook from '@eventpanel/front/api';
import { CreateWorkspaceDto } from '@eventpanel/shared/dto/workspaces/create-workspace.dto';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import { fireEvent } from '../../../../jest.setup';
import { customRender } from '../../../test-utils';
import { FormContainerRenderProps } from '../../form/FormContainer';

import CreateWorkspace, { CreateWorkspaceProps } from './CreateWorkspace';

type ResultType = ReturnType<typeof apiHook.useCreateWorkspace>;
const mockCreateWorkspace = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  data: null,
  error: null,
  status: 'idle',
  isLoading: false,
  createWorkspace: mockCreateWorkspace,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useCreateWorkspace: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<CreateWorkspaceDto> = {}): CreateWorkspaceDto => ({
  name: 'New Workspace',
  ...form,
});
const renderForm = (
  control: FormContainerRenderProps<CreateWorkspaceDto>['control'],
  form: CreateWorkspaceDto = getForm()
) => {
  control.current.setValue('name', form.name);
  return <div />;
};
const getProps = (props: Partial<CreateWorkspaceProps> = {}): CreateWorkspaceProps => ({
  onSuccess: jest.fn(),
  render: ({ field: { control } }) => renderForm(control),
  ...props,
});

describe('CreateWorkspace', () => {
  it('should render form', () => {
    const form = 'form';
    const props = getProps({ render: () => <div>{form}</div> });
    const { getByText } = customRender(<CreateWorkspace {...props} />);

    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(getByText(form)).toBeInTheDocument();
  });

  it('should call onSuccess', () => {
    jest
      .spyOn(authHook, 'useCreateWorkspace')
      .mockReturnValue(getResult({ data: {} as WorkspaceDto, status: 'success' }));

    const props = getProps();
    customRender(<CreateWorkspace {...props} />);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  describe('createWorkspace', () => {
    it('should call when form is VALID', () => {
      const { getByRole } = customRender(<CreateWorkspace {...getProps()} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateWorkspace).toHaveBeenCalledTimes(1);
      expect(mockCreateWorkspace).toHaveBeenCalledWith(getForm());
    });

    it.each<[string, CreateWorkspaceDto]>([
      ['name too short', getForm({ name: 'Q' })],
      ['name too long', getForm({ name: new Array(50).fill('Q').join() })],
    ])('should NOT call when: %s', (_, form) => {
      const props = getProps({ render: ({ field: { control } }) => renderForm(control, form) });
      const { getByRole } = customRender(<CreateWorkspace {...props} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateWorkspace).not.toHaveBeenCalled();
    });
  });
});
