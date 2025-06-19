import React from 'react';
import { useParams } from 'react-router-dom';
import useCategoryPromotionsData from '../hooks/useCategoryPromotionsData';
import Promotions from '../Promotions/Promotions';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';

const CategoryPromotionsPage = () => {
  const { id } = useParams();
  const { promotions, loading, error } = useCategoryPromotionsData(id);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!promotions || promotions.length === 0) {
    return <Alert severity="info">Brak promocji dla tej kategorii.</Alert>;
  }

  const categoryName = promotions[0]?.categoryName || `ID: ${id}`;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
        Promocje dla kategorii: {categoryName}
      </Typography>
      <Promotions dataSource={promotions} />
    </Box>
  );
};

export default CategoryPromotionsPage;