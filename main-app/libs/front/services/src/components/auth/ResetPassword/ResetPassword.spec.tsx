import React from 'react';
import * as authHook from '@eventpanel/front/api';
import { CheckEmailDto } from '@eventpanel/shared/dto/users/check-email.dto';

import { fireEvent } from '../../../../jest.setup';
import { customRender } from '../../../test-utils';
import { FormContainerRenderProps } from '../../form/FormContainer';

import ResetPassword, { ResetPasswordProps } from './ResetPassword';

type ResultType = ReturnType<typeof authHook.useResetPassword>;
const mockResetPassword = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  user: null,
  error: null,
  status: 'idle',
  isLoading: false,
  resetPassword: mockResetPassword,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useResetPassword: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<CheckEmailDto> = {}): CheckEmailDto => ({
  email: 'email@mail.com',
  ...form,
});
const renderForm = (control: FormContainerRenderProps<CheckEmailDto>['control'], form: CheckEmailDto = getForm()) => {
  control.current.setValue('email', form.email);
  return <div />;
};

const getProps = (props: Partial<ResetPasswordProps> = {}): ResetPasswordProps => ({
  render: ({ control }) => renderForm(control),
  ...props,
});

describe('ResetPassword', () => {
  it('should render default', () => {
    const test = 'test';
    const props = getProps({ render: () => <div>{test}</div> });
    const { getByText } = customRender(<ResetPassword {...props} />);

    expect(getByText(test)).toBeInTheDocument();
  });

  describe('resetPassword', () => {
    it('should call when form has NO errors', () => {
      const { getByRole } = customRender(<ResetPassword {...getProps()} />);

      fireEvent.submit(getByRole('form'));
      expect(mockResetPassword).toHaveBeenCalledTimes(1);
      expect(mockResetPassword).toHaveBeenCalledWith(getForm());
    });

    it('should NOT call when email is NOT valid', () => {
      const form = getForm({ email: 'Not Email' });
      const props = getProps({ render: ({ control }) => renderForm(control, form) });
      const { getByRole } = customRender(<ResetPassword {...props} />);

      fireEvent.submit(getByRole('form'));
      expect(mockResetPassword).not.toHaveBeenCalled();
    });
  });
});
