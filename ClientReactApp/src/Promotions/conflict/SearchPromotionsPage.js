import React, { useState, useEffect } from 'react';
import Promotions from './Promotions';
import promotionsData from '../dummyData/promotionsData';
import './SearchPromotionsPage.css';

const SearchPromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = promotionsData.filter(promo =>
      promo.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
