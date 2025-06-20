// src/presentation/pages/CategoriesPage.js
import React from 'react';
import CategoryList from '../components/CategoryList';
import { Box, Typography } from '@mui/material';

export default function CategoriesPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Kategorie
      </Typography>
      <CategoryList />
    </Box>
  );
}
