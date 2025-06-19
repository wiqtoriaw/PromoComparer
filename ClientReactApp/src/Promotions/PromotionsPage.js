import React from 'react';
import Promotions from './Promotions';
import usePromotionsData from '../hooks/usePromotionsData';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const CurrentPromotions = () => {
  const { promotions, loading, error } = usePromotionsData();

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!promotions || promotions.length === 0) {
    return <Alert severity="info">Brak aktualnych promocji.</Alert>;
  }

  return (
    <Box>
      <Promotions 
        dataSource={promotions}
        title="Aktualne Promocje"
      />
    </Box>
  );
};

export default CurrentPromotions;
