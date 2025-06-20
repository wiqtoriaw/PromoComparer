// src/presentation/components/PromotionGrid.js
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromotionGrid({ items, renderItem, emptyText = "Brak wyników.", withAnimation = true, query = '' }) {
  if (!items || items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="textSecondary">{emptyText}</Typography>
      </Box>
    );
  }
  return (
    <Grid container spacing={2}>
      {/* Najważniejsze: key zależny od query, oraz mode="wait" */}
      <AnimatePresence key={query} mode="wait">
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={item.id || i}>
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
