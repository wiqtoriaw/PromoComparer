// src/Pages/FavouritesPage.js
import React from 'react';
import { useFavourites } from '../context/FavouritesContext';
import PromotionsItem from '../Promotions/PromotionsItem';
import { Grid, Typography, Box } from '@mui/material';

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Twoje ulubione promocje ({favourites.length})
      </Typography>
      {favourites.length === 0 ? (
        <Typography>Nie masz jeszcze ulubionych promocji.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favourites.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <PromotionsItem promo={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
