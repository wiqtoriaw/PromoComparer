// src/context/AuthProvider.js
import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { register as apiRegister, login as apiLogin, logout as apiLogout } from '../Services/auth';

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('lastLoginEmail');
    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  const register = useCallback(async ({ email, password }) => {
    await apiRegister({ email, password });
    localStorage.setItem('lastLoginEmail', email);
    setUserEmail(email);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    await apiLogin({ email, password });
    localStorage.setItem('lastLoginEmail', email);
    setUserEmail(email);
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    localStorage.removeItem('lastLoginEmail');
    setUserEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user: userEmail ? { email: userEmail } : null,
      register, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
