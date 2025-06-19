// src/application/hooks/useAuth.js
import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export default function useAuth() {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChange(updatedUser => {
      setUser(updatedUser);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    login: AuthService.login,
    logout: AuthService.logout,
  };
}
