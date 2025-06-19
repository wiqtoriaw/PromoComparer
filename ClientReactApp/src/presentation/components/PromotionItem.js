// src/presentation/components/PromotionItem.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function PromotionItem({ promotion, onFavouriteToggle, isFavourite }) {
  return (
    <Card>
      {promotion.imageUrl && (
        <CardMedia component="img" height="140" image={promotion.imageUrl} alt={promotion.title} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6">{promotion.title}</Typography>
        <Typography variant="body2" color="text.secondary">{promotion.description}</Typography>
        <Typography variant="caption" color="text.secondary">
          {promotion.isActive() ? 'Aktywna' : 'Nieaktywna'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => onFavouriteToggle(promotion.id)} aria-label="add to favorites">
          {isFavourite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}