// src/presentation/pages/HomePage.js
import React from 'react';
import PromotionsList from '../components/PromotionsList';
import PromotionItem from '../components/PromotionItem';
import PromotionService from '../../application/services/PromotionService';
import FavouritesService from '../../application/services/FavouritesService';
import useAuth from '../../application/hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();
  const favs = user ? FavouritesService.getAll() : [];

  const handleToggle = id => {
    if (!user) return;
    if (favs.includes(id)) FavouritesService.remove(id);
    else FavouritesService.add(id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Najlepsze promocje</h2>
      <PromotionsList
        fetchFn={() => PromotionService.getTop()}
        renderItem={promotion => (
          <PromotionItem
            key={promotion.id}
            promotion={promotion}
            isFavourite={favs.includes(promotion.id)}
            onFavouriteToggle={handleToggle}
          />
        )}
      />
    </div>
  );
}
