import React from 'react';
import { useParams } from 'react-router-dom';
import Promotions from '../Promotions/Promotions';
import useShopPromotionsData from '../hooks/useShopPromotionsData';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const ShopPromotionsPage = () => {
  const { id } = useParams();
  const { promotions, loading, error } = useShopPromotionsData(id);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!promotions || promotions.length === 0) {
    return <Alert severity="info">Brak promocji dla tego sklepu.</Alert>;
  }

  const storeName = promotions[0]?.storeName || `ID: ${id}`;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
        Promocje dla sklepu: {storeName}
      </Typography>
      <Promotions dataSource={promotions} />
    </Box>
  );
};

export default ShopPromotionsPage;
