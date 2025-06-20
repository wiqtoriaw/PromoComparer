// src/presentation/components/PromotionCard/PromotionsItem.js
import React from 'react';
import { Card } from '@mui/material';
import PromotionCardHeader from './PromotionCardHeader';
import PromotionCardDetails from './PromotionCardDetails';

export default function PromotionsItem({ promotion, isFavourite, onFavouriteToggle }) {
  // Obliczenia, formatowanie itd.
  const discountAmount =
    promotion.discountAmount ??
    (promotion.originalPrice != null && promotion.priceAfterPromotion != null
      ? (promotion.originalPrice - promotion.priceAfterPromotion).toFixed(2)
      : null);

  const now = new Date();
  const expired = promotion.endDate && new Date(promotion.endDate) < now;

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.18s, box-shadow 0.18s',
        position: 'relative',
        bgcolor: expired ? 'grey.100' : 'background.paper',
        opacity: expired ? 0.75 : 1,
        '&:hover': {
          transform: 'translateY(-6px) scale(1.03)',
          boxShadow: 6,
          borderColor: 'primary.light'
        }
      }}
    >
      <PromotionCardHeader
        promotion={promotion}
        isFavourite={isFavourite}
        onFavouriteToggle={onFavouriteToggle}
      />
      <PromotionCardDetails
        promotion={promotion}
        discountAmount={discountAmount}
        expired={expired}
      />
    </Card>
  );
}
