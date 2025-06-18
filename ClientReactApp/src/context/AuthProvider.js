// src/context/AuthProvider.js
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
  fetchCurrentUser,
  getAccessToken
} from '../Services/auth';
import { jwtDecode } from 'jwt-decode';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch (e) {
        console.warn('Dekodowanie JWT nie powiodło się', e);
      }
      fetchCurrentUser()
        .then(full => setUser(full))
        .catch(() => setUser(null));
    }
  }, []);

  /**
   * Rejestracja użytkownika.
   * Jeśli backend zwraca token, logujemy i pobieramy pełny profil.
   * Jeśli nie, traktujemy rejestrację jako zakończoną sukcesem i zwracamy odpowiedź.
   */
  const register = async ({ email, password }) => {
    const res = await apiRegister({ email, password });
    if (res.accessToken) {
      try { setUser(jwtDecode(res.accessToken)); } catch {}
      const full = await fetchCurrentUser();
      setUser(full);
      return full;
    }
    return res; // traktujemy sukces nawet bez tokenów
  };

  /**
   * Logowanie użytkownika.
   */
  const login = async ({ email, password }) => {
    const res = await apiLogin(email, password);
    if (res.accessToken) {
      try { setUser(jwtDecode(res.accessToken)); } catch {}
      const full = await fetchCurrentUser();
      setUser(full);
      return full;
    }
    throw new Error(res.error || 'Logowanie nie powiodło się');
  };

  /**
   * Wylogowanie.
   */
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
