// src/presentation/pages/SearchPage.js
import React, { useState, useMemo } from 'react';
import usePromotionsData from '../../application/hooks/usePromotionData';
import PromotionGrid from '../components/PromotionsGrid';
import PromotionItem from '../components/PromotionCard/PromotionsItem';
import { TextField, Box, Typography, CircularProgress, Alert } from '@mui/material';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { promotions = [], loading, error } = usePromotionsData();

  const filtered = useMemo(() => {
    if (!query) return [];
    return promotions.filter(promotion =>
      `${promotion.productName} ${promotion.storeName}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [promotions, query]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Szukaj promocji
      </Typography>
      <TextField
        fullWidth
        label="Szukaj promocji"
        variant="outlined"
        value={query}
        onChange={e => setQuery(e.target.value)}
        margin="normal"
      />
      {loading && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">Błąd ładowania: {error.message}</Alert>}

      {!loading && !error && (
        <PromotionGrid
          items={query ? filtered : []}
          renderItem={promotion => <PromotionItem promotion={promotion} />}
          emptyText={query
            ? "Nie znaleziono żadnych promocji dla podanych kryteriów."
            : "Wpisz frazę, by wyszukać promocje."}
          withAnimation
        />
      )}
    </Box>
  );
}
