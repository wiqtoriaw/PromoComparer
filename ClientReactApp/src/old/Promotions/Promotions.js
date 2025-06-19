import React from 'react';
import PromotionsItem from './PromotionsItem';
import { Grid, Typography } from '@mui/material';

const Promotions = ({ dataSource, title }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {dataSource.map(promo => (
          <Grid item xs={12} sm={6} md={4} key={promo.id}>
            <PromotionsItem promo={promo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Promotions;
