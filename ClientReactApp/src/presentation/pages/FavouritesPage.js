// src/presentation/pages/FavouritesPage.js
import React from 'react';
import PromotionItem from '../components/PromotionItem';
import PromotionService from '../../application/services/PromotionService';
import FavouritesService from '../../application/services/FavouritesService';
import useAuth from '../../application/hooks/useAuth';

export default function FavouritesPage() {
  const { user } = useAuth();
  if (!user) return <div className="p-4">Zaloguj się, aby przeglądać ulubione.</div>;

  const favIds = FavouritesService.getAll();
  const promotions = favIds.map(id => PromotionService.getAll().then(list => list.find(p => p.id === id)));

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Twoje ulubione promocje</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promotions.map((promPromise, idx) => (
          <React.Fragment key={idx}>
            {/* Możesz tu użyć Suspense lub innego mechanizmu */}
            {/* Dla uproszczenia zakładamy dane już w promPromise */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}