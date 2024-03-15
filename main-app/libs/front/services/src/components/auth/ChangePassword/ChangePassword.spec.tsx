import React from 'react';
import * as authHook from '@eventpanel/front/api';
import { ChangePasswordNoTokenDto } from '@eventpanel/shared/dto/users/change-password.dto';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import { fireEvent } from '../../../../jest.setup';
import { customRender } from '../../../test-utils';
import { FormContainerRenderProps } from '../../form/FormContainer';

import ChangePassword, { ChangePasswordProps } from './ChangePassword';

type ResultType = ReturnType<typeof authHook.useChangePassword>;
const mockChangePassword = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  user: null,
  error: null,
  status: 'idle',
  isLoading: false,
  changePassword: mockChangePassword,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useChangePassword: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<ChangePasswordNoTokenDto> = {}): ChangePasswordNoTokenDto => ({
  password: 'password123',
  ...form,
});
const renderForm = (
  control: FormContainerRenderProps<ChangePasswordNoTokenDto>['control'],
  form: ChangePasswordNoTokenDto = getForm()
) => {
  control.current.setValue('password', form.password);
  return <div />;
};

const token = 'token';
const getProps = (props: Partial<ChangePasswordProps> = {}): ChangePasswordProps => ({
  token,
  onSuccess: jest.fn(),
  render: ({ control }) => renderForm(control),
  ...props,
});

describe('ChangePassword', () => {
  it('should render default', () => {
    const test = 'test';
    const props = getProps({ render: () => <div>{test}</div> });
    const { getByText } = customRender(<ChangePassword {...props} />);

    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(getByText(test)).toBeInTheDocument();
  });

  it('should call onSuccess', () => {
    jest
      .spyOn(authHook, 'useChangePassword')
      .mockReturnValue(getResult({ user: {} as TokenUserDto, status: 'success' }));

    const props = getProps();
    customRender(<ChangePassword {...props} />);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  describe('changePassword', () => {
    it('should call when form has NO errors', () => {
      const { getByRole } = customRender(<ChangePassword {...getProps()} />);

      fireEvent.submit(getByRole('form'));
      expect(mockChangePassword).toHaveBeenCalledTimes(1);
      expect(mockChangePassword).toHaveBeenCalledWith({ token, ...getForm() });
    });

    it.each<[string, ChangePasswordNoTokenDto]>([['password too short', getForm({ password: 'qwe123' })]])(
      'should NOT call when: %s',
      (_, form) => {
        const props = getProps({ render: ({ control }) => renderForm(control, form) });
        const { getByRole } = customRender(<ChangePassword {...props} />);

        fireEvent.submit(getByRole('form'));
        expect(mockChangePassword).not.toHaveBeenCalled();
      }
    );
  });
});
