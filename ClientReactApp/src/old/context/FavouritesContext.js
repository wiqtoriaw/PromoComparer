// src/context/FavouritesContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from './NotificationContext';
import api from '../Services/api';

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [favourites, setFavourites] = useState([]);

  // helper do ładowania pełnej listy ulubionych z backendu
  const loadFavourites = useCallback(() => {
    api.getFavourites()
      .then(setFavourites)
      .catch(err => {
        console.error('Błąd ładowania ulubionych:', err.message);
        setFavourites([]);
      });
  }, []);

  // przy każdej zmianie użytkownika
  useEffect(() => {
    if (user) {
      loadFavourites();
    } else {
      setFavourites([]);
    }
  }, [user, loadFavourites]);

  // dodaj ulubioną → potem załaduj na nowo
  const addFavourite = useCallback(async id => {
    if (!user) {
      showNotification('Musisz być zalogowany, aby dodać do ulubionych.', 'warning');
      return;
    }
    await api.addFavourite(id);
    await loadFavourites();
  }, [user, loadFavourites, showNotification]);

  // usuń ulubioną → potem załaduj na nowo
  const removeFavourite = useCallback(async id => {
    await api.removeFavourite(id);
    await loadFavourites();
  }, [loadFavourites]);

  const isFavourite = useCallback(
    id => favourites.some(p => p.id === id),
    [favourites]
  );

  return (
    <FavouritesContext.Provider
      value={{ favourites, isFavourite, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}
