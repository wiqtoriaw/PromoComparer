// src/Pages/FavouritesPage.js
import React from 'react';
import { useFavourites } from '../context/FavouritesContext';
import PromotionsItem from '../Promotions/PromotionsItem';

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Twoje ulubione promocje ({favourites.length})</h2>
      {favourites.length === 0
        ? <p>Nie masz jeszcze ulubionych promocji.</p>
        : favourites.map(promo => (
            <PromotionsItem key={promo.id} promo={promo} />
          ))
      }
    </div>
  );
}
