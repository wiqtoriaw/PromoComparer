import React, { useState, useEffect } from 'react';
import Promotions from './Promotions';
import usePromotionsData from '../hooks/usePromotionsData';
import { Typography, CircularProgress, Alert, Box, TextField } from '@mui/material';

const SearchPromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { promotions, loading, error } = usePromotionsData();

  useEffect(() => {
    if (searchTerm.trim() === '' || loading || error) {
      setSearchResults([]);
      return;
    }

    const filteredResults = promotions.filter(promo =>
      promo.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchTerm, promotions, loading, error]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
        🔍 Wyszukiwarka Promocji
      </Typography>
      <TextField
        fullWidth
        label="Wpisz nazwę produktu..."
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        sx={{ mb: 4 }}
      />

      {searchResults.length > 0 ? (
        <Promotions dataSource={searchResults} title="Wyniki wyszukiwania" />
      ) : (
        searchTerm && <Alert severity="info">Brak wyników dla frazy: <strong>{searchTerm}</strong>.</Alert>
      )}
    </Box>
  );
};

export default SearchPromotionsPage;