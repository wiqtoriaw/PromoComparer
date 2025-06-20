// src/presentation/pages/StorePromotionsPage.js

import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useData from '../../application/hooks/useData';
import PromotionItem from '../components/PromotionCard/PromotionsItem';
import PromotionService from '../../application/services/PromotionService';
import { Grid, CircularProgress, Alert, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};

export default function StorePromotionsPage() {
  const { storeId } = useParams();

  const fetchByStore = useCallback(
    () => PromotionService.getByStore(storeId),
    [storeId]
  );
  const { data: promotions = [], loading, error } = useData(fetchByStore, [fetchByStore]);

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (error) return <Alert severity="error">Błąd ładowania promocji: {error.message}</Alert>;

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Typography variant="h4" gutterBottom sx={{ px: 1 }}>Promocje w sklepie</Typography>
      <Grid container spacing={3} sx={{ px: 1 }}>
        {promotions.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info">Brak promocji w tym sklepie.</Alert>
          </Grid>
        )}
        {promotions.map(promo => (
          <Grid item xs={12} sm={6} md={4} key={promo.id}>
            <motion.div variants={itemVariants}>
              <PromotionItem promotion={promo} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}
