import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import PromotionsItem from '../Promotions/PromotionsItem';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);

  // 1. Przy montowaniu pobieramy listę ulubionych promocji
  useEffect(() => {
    api.getFavourites()
      .then(setFavourites)
      .catch(err => console.error('Błąd pobierania ulubionych:', err.message));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Twoje ulubione promocje ({favourites.length})</h2>

      {favourites.length === 0 ? (
        <p>Nie masz jeszcze ulubionych promocji.</p>
      ) : (
        // 2. Dla każdej promocji wyrenderuj kafelek PromotionsItem
        favourites.map(promo => (
          <PromotionsItem key={promo.id} promo={promo} />
        ))
      )}
    </div>
  );
}
