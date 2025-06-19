// src/Shops/ShopsPage.js

import React from 'react';
import useShopsData from '../hooks/useShopsData';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

const ShopsPage = () => {
  const { shops = [], loading, error } = useShopsData();
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Błąd: {error}</Alert>;

  const handleShopClick = (id) => {
    navigate(`/stores/${id}`);
  };

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        🏬 Lista Sklepów
      </Typography>
      <Grid container spacing={3}>
        {shops.map(shop => (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <Card>
              <CardActionArea onClick={() => handleShopClick(shop.id)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    📍 {shop.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopsPage;
