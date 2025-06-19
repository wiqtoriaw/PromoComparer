// src/presentation/components/CategoryList.js
import React from 'react';
import useCategoryData from '../../application/hooks/useCategoryData';
import { List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CategoryList() {
  const { data: categories, loading, error } = useCategoryData();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Błąd ładowania: {error.message}</Alert>;

  return (
    <List>
      {categories.map(cat => (
        <ListItem key={cat.id} component={RouterLink} to={`/categories/${cat.id}`} button>
          <ListItemText primary={cat.name} />
        </ListItem>
      ))}
    </List>
  );
}
