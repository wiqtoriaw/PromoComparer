// src/presentation/components/PromotionsList.js
import React, { useState, useEffect, useMemo } from 'react';
import { CircularProgress, Alert, Box } from '@mui/material';
import PromotionGrid from './PromotionsGrid';

export default function PromotionsList({
  fetchFn,
  renderItem,
  filterFn,
  emptyText = "Brak wyników.",
  withAnimation = true
}) {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchFn()
      .then(data => { if (mounted) setAllItems(Array.isArray(data) ? data : []); })
      .catch(err => {
        if (mounted) {
          if (err?.response?.status === 404) {
            setAllItems([]);
            setError(null);
          } else {
            setError(err);
          }
        }
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [fetchFn]);

  const itemsToShow = useMemo(() => (
    filterFn ? allItems.filter(filterFn) : allItems
  ), [allItems, filterFn]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">Błąd ładowania: {error.message}</Alert>;
  }

  return (
    <PromotionGrid
      items={itemsToShow}
      renderItem={renderItem}
      emptyText={emptyText}
      withAnimation={withAnimation}
    />
  );
}
