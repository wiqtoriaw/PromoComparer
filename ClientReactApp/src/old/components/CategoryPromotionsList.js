import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';

export default function CategoryPromotionsList() {
  const { id } = useParams();
  const [promos, setPromos] = useState([]);
  const [favIds, setFavIds] = useState([]);

  // Pobranie promocji danej kategorii
  useEffect(() => {
    api.getPromotionsByCategory(id)
      .then(setPromos)
      .catch(err => console.error('Błąd pobierania promocji:', err.message));
  }, [id]);

  // Pobranie listy ulubionych promocji użytkownika
  useEffect(() => {
    api.getFavourites()
      .then(favs => setFavIds(favs.map(f => f.id)))
      .catch(err => console.error('Błąd pobierania ulubionych:', err.message));
  }, []);

  // Obsługa kliknięcia serduszka: dodanie do ulubionych
  const handleFav = promoId => {
    api.addFavourite(promoId)
      .then(() => setFavIds(ids => [...ids, promoId]))
      .catch(err => console.error('Błąd dodawania do ulubionych:', err.message));
  };

  return (
    <div>
      <h2>Promocje w kategorii {id}</h2>
      <ul>
        {promos.map(p => (
          <li key={p.id} style={{ marginBottom: '8px' }}>
            <button onClick={() => handleFav(p.id)} style={{ marginRight: '8px' }}>
              {favIds.includes(p.id) ? '❤️' : '🤍'}
            </button>
            {p.title} — {p.price} PLN
          </li>
        ))}
      </ul>
    </div>
  );
}
