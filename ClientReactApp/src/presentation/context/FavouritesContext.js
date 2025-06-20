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

  const add = useCallback(async (id) => {
    try {
      const updated = await FavouritesService.add(id);
      setFavourites(updated);
    } catch (err) {
      setError(err);
    }
  }, []);

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

export function useFavourites() {
  return useContext(FavouritesContext);
}
