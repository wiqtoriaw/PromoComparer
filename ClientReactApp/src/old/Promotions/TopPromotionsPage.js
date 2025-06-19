import React from 'react';
import Promotions from './Promotions';
import useTopPromotionsData from '../hooks/useTopPromotionsData';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const TopPromotionsPage = () => {
  const { topPromotions, loading, error } = useTopPromotionsData();

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!topPromotions || topPromotions.length === 0) {
    return <Alert severity="info">Brak promocji w tej kategorii.</Alert>;
  }

  return (
    <Box>
      <Promotions 
        dataSource={topPromotions}
        title="Top 10 Promocji"
      />
    </Box>
  );
};

export default TopPromotionsPage;
