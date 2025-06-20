// src/presentation/components/PromotionsList.js
import React, { useState, useEffect, useMemo } from 'react';
import { Grid, CircularProgress, Alert, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromotionsList({
  fetchFn,      // Funkcja pobierająca dane z API (promisująca!)
  renderItem,   // Jak renderować element
  filterFn,     // Funkcja filtrująca/promocje (np. po wpisanej frazie)
  emptyText = "Brak wyników.",
  withAnimation = false
}) {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pobieraj dane tylko raz na wejściu/zmianie fetchFn
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchFn()
      .then(data => { if (mounted) setAllItems(Array.isArray(data) ? data : []); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [fetchFn]);

  // Filtrowanie w pamięci
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
  if (itemsToShow.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          {emptyText}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        {itemsToShow.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            {withAnimation ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.36, delay: i * 0.05 }}
              >
                {renderItem(item)}
              </motion.div>
            ) : (
              renderItem(item)
            )}
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
