import React, { useContext } from 'react';
import { TokenUserDto } from '@eventpanel/shared/dto/users/token-user.dto';

import useLocalStorage from '../../../hooks/useLocalStorage';

type AuthContextType = {
  user: TokenUserDto | null;
  login: (user: TokenUserDto) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<TokenUserDto>('USER', null);
  const [, setToken] = useLocalStorage<string>('TOKEN', null);

  const login = (newUser: TokenUserDto) => {
    setUser(newUser);
    setToken(newUser.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
