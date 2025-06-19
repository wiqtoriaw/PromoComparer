// src/presentation/components/PromotionsList.js
import React from 'react';
import useData from '../../application/hooks/useData';
import { Grid, CircularProgress, Alert } from '@mui/material';

export default function PromotionsList({ fetchFn, renderItem }) {
  const { data: items, loading, error } = useData(fetchFn);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Błąd ładowania: {error.message}</Alert>;

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          {renderItem(item)}
        </Grid>
      ))}
    </Grid>
  );
}