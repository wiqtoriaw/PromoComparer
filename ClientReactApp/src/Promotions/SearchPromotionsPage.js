import React, { useState, useEffect } from 'react';
import Promotions from './Promotions';
import usePromotionsData from '../hooks/usePromotionsData';
import './SearchPromotionsPage.css';

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
      promo.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchTerm, promotions, loading, error]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>⏳ Ładowanie promocji...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;

  return (
    <div className="search-promotions-page">
      <h1>🔍 Wyszukiwarka Promocji</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Wpisz nazwę produktu..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      {searchResults.length > 0 ? (
        <Promotions dataSource={searchResults} title="Wyniki wyszukiwania" />
      ) : (
        searchTerm && <p>Brak wyników dla frazy: <strong>{searchTerm}</strong>.</p>
      )}
    </div>
  );
};

export default SearchPromotionsPage;