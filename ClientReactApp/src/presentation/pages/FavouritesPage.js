// src/presentation/pages/FavouritesPage.js

import React, { useMemo, useEffect, useState } from 'react';
import { useFavourites } from '../context/FavouritesContext';
import useAuth from '../../application/hooks/useAuth';
import PromotionService from '../../application/services/PromotionService';
import PromotionItem from '../components/PromotionCard/PromotionsItem';
import PromotionGrid from '../components/PromotionsGrid';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

export default function FavouritesPage() {
  const { user } = useAuth();
  const { favourites: favIds, loading, error, add, remove } = useFavourites();
  const [allPromotions, setAllPromotions] = useState([]);
  const [loadingPromotions, setLoadingPromotions] = useState(true);

  useEffect(() => {
    setLoadingPromotions(true);
    PromotionService.getActive()
      .then(data => setAllPromotions(Array.isArray(data) ? data : []))
      .finally(() => setLoadingPromotions(false));
  }, []);

  const favPromotions = useMemo(() => {
    if (!favIds || !Array.isArray(favIds) || !allPromotions.length) return [];
    const favIdSet = new Set(favIds.map(f => f.id || f));
    return allPromotions.filter(p => favIdSet.has(p.id));
  }, [favIds, allPromotions]);

  const handleToggle = id => {
    if (!user) return;
    const isFav = favIds.some(f => (f.id || f) === id);
    if (isFav) remove(id);
    else add(id);
  };

  if (loading || loadingPromotions) {
    return <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Alert severity="error">Błąd ładowania: {error.message}</Alert>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Ulubione promocje</Typography>
      <PromotionGrid
        items={favPromotions}
        renderItem={promo => (
          <PromotionItem
            promotion={promo}
            isFavourite={true}
            onFavouriteToggle={() => handleToggle(promo.id)}
          />
        )}
        emptyText="Nie masz jeszcze ulubionych promocji."
        withAnimation
      />
    </Box>
  );
}
