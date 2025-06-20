// src/presentation/components/CategoryCard.js
import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';

export default function CategoryCard({ category, ...props }) {
  return (
    <Card sx={{ borderRadius: 2, height: '100%' }} {...props}>
      <CardActionArea component={RouterLink} to={`/categories/${category.id}`}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CategoryIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h6">{category.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
