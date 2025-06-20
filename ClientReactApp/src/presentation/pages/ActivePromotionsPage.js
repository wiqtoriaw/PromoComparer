// src/presentation/pages/ActivePromotionsPage.js

import React, { useCallback } from 'react';
import PromotionsList from '../components/PromotionsList';
import PromotionItem from '../components/PromotionCard/PromotionsItem';
import PromotionService from '../../application/services/PromotionService';
import { useFavourites } from '../context/FavouritesContext';
import useAuth from '../../application/hooks/useAuth';
import { Box, Typography } from '@mui/material';

export default function ActivePromotionsPage() {
  const fetchActive = useCallback(
    () => PromotionService.getActive(),
    []
  );

  const { user } = useAuth();
  const { favourites, remove, add } = useFavourites();

  const handleToggle = id => {
    if (!user) return;
    const isFav = favourites.some(p => p.id === id);
    if (isFav) remove(id);
    else add(id);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Wszystkie promocje
      </Typography>
      <PromotionsList
        fetchFn={fetchActive}
        deps={[fetchActive]}
        renderItem={promotion => (
          <PromotionItem
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
