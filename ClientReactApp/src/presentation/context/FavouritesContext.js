// src/presentation/context/FavouritesContext.js
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import FavouritesService from '../../application/services/FavouritesService';
import useAuth from '../../application/hooks/useAuth';

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pobieraj ulubione tylko przy zmianie użytkownika (login/logout)
  useEffect(() => {
    if (!user) {
      setFavourites([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    FavouritesService.getAll()
      .then(setFavourites)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  // Dodawanie ulubionych
  const add = useCallback(async (id) => {
    try {
      const updated = await FavouritesService.add(id);
      setFavourites(updated);
    } catch (err) {
      setError(err);
    }
  }, []);

  // Usuwanie ulubionych
  const remove = useCallback(async (id) => {
    try {
      const updated = await FavouritesService.remove(id);
      setFavourites(updated);
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <FavouritesContext.Provider value={{ favourites, loading, error, add, remove }}>
      {children}
    </FavouritesContext.Provider>
  );
}

// Własny hook do korzystania z contextu
export function useFavourites() {
  return useContext(FavouritesContext);
}
