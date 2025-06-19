// src/Promotions/PromotionsItem.js
import React from 'react';
import { useFavourites } from '../context/FavouritesContext';
import { Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const formatDate = date => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d)) return date;
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yy = d.getFullYear();
  return `${dd}-${mm}-${yy}`;
};

export default function PromotionsItem({ promo }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(promo.id);
  const toggle = () => fav ? removeFavourite(promo.id) : addFavourite(promo.id);

  const discountAmount = promo.discountAmount != null
    ? promo.discountAmount
    : (promo.originalPrice != null && promo.priceAfterPromotion != null)
      ? (promo.originalPrice - promo.priceAfterPromotion).toFixed(2)
      : null;

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites" onClick={toggle}>
            {fav ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        }
        title={promo.productName || 'Promotion'}
        subheader={promo.storeName}
      />
      <CardContent>
        {promo.priceAfterPromotion != null &&
          <Typography variant="body2" color="text.secondary">
            <strong>Cena promocyjna:</strong> {promo.priceAfterPromotion}
          </Typography>}
        {promo.originalPrice != null &&
          <Typography variant="body2" color="text.secondary">
            <strong>Cena regularna:</strong> {promo.originalPrice}
          </Typography>}
        {discountAmount &&
          <Typography variant="body2" color="text.secondary">
            <strong>Kwota promocji:</strong> {discountAmount}
          </Typography>}
        {promo.discountPercent != null &&
          <Typography variant="body2" color="text.secondary">
            <strong>Procent promocji:</strong> {promo.discountPercent}%
          </Typography>}
        {promo.categoryName &&
          <Typography variant="body2" color="text.secondary">
            <strong>Kategoria:</strong> {promo.categoryName}
          </Typography>}
        <Typography variant="body2" color="text.secondary">
          <strong>Okres:</strong> {formatDate(promo.startDate)} – {formatDate(promo.endDate)}
        </Typography>
        {promo.untilOutOfStock != null &&
          <Typography variant="body2" color="text.secondary">
            <strong>Do wyczerpania zapasów:</strong> {promo.untilOutOfStock ? '✔️' : '❌'}
          </Typography>}
        {promo.requiredApp &&
          <Typography variant="body2" color="text.secondary">
            <strong>Wymagana aplikacja:</strong> {promo.requiredApp}
          </Typography>}
      </CardContent>
    </Card>
  );
}
