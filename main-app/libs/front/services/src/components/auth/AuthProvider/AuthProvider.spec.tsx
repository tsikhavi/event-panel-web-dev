import React from 'react';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import { fireEvent } from '../../../../jest.setup';
import { customRender, renderHook } from '../../../test-utils';

import AuthProvider, { useAuth } from './AuthProvider';

const loginButton = 'Login Button';
const logoutButton = 'Logout Button';
const mockUser: TokenUserDto = {
  id: 'userId',
  email: 'user@email.com',
  lastName: 'LastName',
  firstName: 'First Name',
  accessToken: 'access token',
};

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <>
      <p>{user?.email}</p>
      <button type="button" onClick={() => login(mockUser)}>
        {loginButton}
      </button>
      <button type="button" onClick={() => logout()}>
        {logoutButton}
      </button>
    </>
  );
};

describe('AuthProvider', () => {
  afterAll(() => {
    localStorage.clear();
  });

  it('should render children', () => {
    const children = 'Some Children';
    const { getByText } = customRender(
      <AuthProvider>
        <div>{children}</div>
      </AuthProvider>
    );

    expect(getByText(children)).toBeInTheDocument();
  });

  describe('useAuth', () => {
    it('should throw an error if used outside of the AuthProvider', () => {
      jest.spyOn(React, 'useContext').mockReturnValue(undefined);

      const { result } = renderHook(() => useAuth());

      expect(result.error).toEqual(new Error('useAuth must be used within an AuthProvider'));
    });

    it('should call login', () => {
      const { getByRole, getByText, queryByText } = customRender(<TestComponent />);

      expect(queryByText(mockUser.email)).not.toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: loginButton }));
      expect(getByText(mockUser.email)).toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('USER') || '')).toEqual(mockUser);
      expect(JSON.parse(localStorage.getItem('TOKEN') || '')).toBe(mockUser.accessToken);
    });

    it('should call logout', () => {
      const { getByRole, getByText, queryByText } = customRender(<TestComponent />);

      fireEvent.click(getByRole('button', { name: loginButton }));
      expect(getByText(mockUser.email)).toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: logoutButton }));
      expect(queryByText(mockUser.email)).not.toBeInTheDocument();
      expect(localStorage.getItem('USER')).toBeNull();
      expect(localStorage.getItem('TOKEN')).toBeNull();
    });
  });
});
