// src/presentation/pages/CategoryPromotionsPage.js

import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PromotionsList from '../components/PromotionsList';
import PromotionsItem from '../components/PromotionCard/PromotionsItem';
import PromotionService from '../../application/services/PromotionService';
import { useFavourites } from '../context/FavouritesContext';
import useAuth from '../../application/hooks/useAuth';
import { Box, Typography } from '@mui/material';

export default function CategoryPromotionsPage() {
  const { categoryId } = useParams();
  const { user } = useAuth();
  const { favourites, add, remove } = useFavourites();

  const fetchByCategory = useCallback(
    () => PromotionService.getByCategory(categoryId),
    [categoryId]
  );

  const handleToggle = id => {
    if (!user) return;
    const isFav = favourites.some(p => p.id === id);
    if (isFav) remove(id);
    else add(id);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Promocje w kategorii
      </Typography>
      <PromotionsList
        fetchFn={fetchByCategory}
        deps={[fetchByCategory]}
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
