// src/presentation/pages/StoresPage.js

import React from 'react';
import useShopData from '../../application/hooks/useShopData';
import StoreCard from '../components/StoreCard';
import { Grid, CircularProgress, Alert, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 110 } },
};

export default function StoresPage() {
  const { data: shops, loading, error } = useShopData();

  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (error) return <Alert severity="error">Błąd ładowania sklepów: {error.message}</Alert>;

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Typography variant="h4" gutterBottom>
        Sklepy
      </Typography>
      <Grid container spacing={3} sx={{ px: 1 }}>
        {shops.map(shop => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <motion.div variants={itemVariants}>
              <StoreCard shop={shop} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}
