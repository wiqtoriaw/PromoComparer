// src/Shops/ShopsPage.js

import React from 'react';
import useShopsData from '../hooks/useShopsData';
import { useNavigate } from 'react-router-dom';
import './ShopsPage.css';

const ShopsPage = () => {
  const { shops, loading, error } = useShopsData();
  const navigate = useNavigate();

  if (loading) return <p>⏳ Ładowanie listy sklepów...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;

  const handleShopClick = (id) => {
    navigate(`/shops/${id}/promotions`);
  };

  return (
    <div className="shops-container">
      <h2>🏬 Lista Sklepów</h2>
      <div className="shops-grid">
        {shops.map(shop => (
          <div key={shop.id} className="shop-card" onClick={() => handleShopClick(shop.id)}>
            <h3>📍 {shop.name}</h3>
            <p>🛣️ <strong>Ulica:</strong> {shop.street}</p>
            <p>🏙️ <strong>Miasto:</strong> {shop.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopsPage;
