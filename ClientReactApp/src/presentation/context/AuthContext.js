// src/presentation/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../../application/services/AuthService';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange(updatedUser => {
      setUser(updatedUser);
    });
    return unsubscribe;
  }, []);

  const login = async credentials => AuthService.login(credentials);
  const logout = () => AuthService.logout();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
