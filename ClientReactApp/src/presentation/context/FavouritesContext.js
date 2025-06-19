// src/presentation/context/FavouritesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import FavouritesService from '../../application/services/FavouritesService';
import { useAuthContext } from './AuthContext';

const FavouritesContext = createContext({
  favourites: [],
  addFavourite: id => {},
  removeFavourite: id => {}
});

export function FavouritesProvider({ children }) {
  const { user } = useAuthContext();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user) {
      setFavourites(FavouritesService.getAll());
    } else {
      setFavourites([]);
    }
  }, [user]);

  const addFavourite = id => {
    const updated = FavouritesService.add(id);
    setFavourites(updated);
  };
  const removeFavourite = id => {
    const updated = FavouritesService.remove(id);
    setFavourites(updated);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavouritesContext() {
  return useContext(FavouritesContext);
}