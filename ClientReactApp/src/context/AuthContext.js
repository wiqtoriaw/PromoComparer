import React from 'react';

// Tworzymy kontekst z domyślnymi wartościami
export const AuthContext = React.createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},    // <-- dopisujemy register
});
