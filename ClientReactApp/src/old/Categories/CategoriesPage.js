import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryData from '../hooks/useCategoryData';
import { FormControl, InputLabel, Select, MenuItem, Typography, CircularProgress, Alert, Box } from '@mui/material';

const CategoriesPage = () => {
  const { categories, loading, error } = useCategoryData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    if (selectedCategoryId) {
      navigate(`/categories/${selectedCategoryId}`);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Błąd: {error}</Alert>;
  if (categories.length === 0) return <Alert severity="info">Brak dostępnych kategorii.</Alert>;

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        🎯 Wybierz kategorię produktów
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Wybierz kategorię</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Wybierz kategorię"
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategory && <p>Przekierowywanie do kategorii ID: {selectedCategory}...</p>}
    </Box>
  );
};

export default CategoriesPage;
