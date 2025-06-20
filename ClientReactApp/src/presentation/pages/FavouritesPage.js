// src/presentation/pages/FavouritesPage.js
import React, { useMemo } from 'react';
import { useFavourites } from '../context/FavouritesContext';
import PromotionItem from '../components/PromotionCard/PromotionsItem';
import { Grid, CircularProgress, Alert, Typography, Box } from '@mui/material';
import useAuth from '../../application/hooks/useAuth';
import PromotionService from '../../application/services/PromotionService';

export default function FavouritesPage() {
  const { user } = useAuth();
  const { favourites: favIds, loading, error, add, remove } = useFavourites();
  // favIds to np. tablica id lub bardzo uproszczone obiekty

  // Ładujemy aktywne promocje (jeśli ich dużo, warto cachować globalnie)
  const [allPromotions, setAllPromotions] = React.useState([]);
  const [loadingPromotions, setLoadingPromotions] = React.useState(true);

  React.useEffect(() => {
    setLoadingPromotions(true);
    PromotionService.getActive()
      .then(data => setAllPromotions(Array.isArray(data) ? data : []))
      .finally(() => setLoadingPromotions(false));
  }, []);

  // Wyciągamy obiekty promocji, które są ulubione
  const favPromotions = useMemo(() => {
    if (!favIds || !Array.isArray(favIds) || !allPromotions.length) return [];
    // Jeśli favIds to tablica obiektów z id:
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
    return <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress/></Box>;
  }
  if (error) {
    return <Alert severity="error">Błąd ładowania: {error.message}</Alert>;
  }
  if (!favPromotions.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Nie masz jeszcze ulubionych promocji.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Ulubione promocje</Typography>
      <Grid container spacing={2}>
        {favPromotions.map(promo => (
          <Grid item xs={12} sm={6} md={4} key={promo.id}>
            <PromotionItem
              promotion={promo}
              isFavourite={true}
              onFavouriteToggle={() => handleToggle(promo.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
