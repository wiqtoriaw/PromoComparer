// src/presentation/pages/TopPromotionsPage.js

import React, { useCallback } from 'react';
import PromotionsList from '../components/PromotionsList';
import PromotionsItem from '../components/PromotionCard/PromotionsItem';
import PromotionService from '../../application/services/PromotionService';
import { useFavourites } from '../context/FavouritesContext';
import useAuth from '../../application/hooks/useAuth';
import { Box, Typography } from '@mui/material';

export default function TopPromotionsPage() {
  const { user } = useAuth();
  const { favourites, add, remove } = useFavourites();

  const handleToggle = id => {
    if (!user) return;
    const isFav = favourites.some(p => p.id === id);
    if (isFav) remove(id);
    else add(id);
  };

  const fetchTop = useCallback(
    () => PromotionService.getTop(),
    []
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Najlepsze promocje
      </Typography>
      <PromotionsList
        fetchFn={fetchTop}
        deps={[fetchTop]}
        renderItem={promotion => (
          <PromotionsItem
            key={promotion.id}
            promotion={promotion}
            isFavourite={favourites.some(p => p.id === promotion.id)}
            onFavouriteToggle={() => handleToggle(promotion.id)}
          />
        )}
      />
    </Box>
  );
}
