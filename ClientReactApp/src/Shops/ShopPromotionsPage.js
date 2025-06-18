import React from 'react';
import { useParams } from 'react-router-dom';
import Promotions from '../Promotions/Promotions';
import useShopPromotionsData from '../hooks/useShopPromotionsData';
import './ShopPromotionsPage.css'; // Import nowego stylu

const ShopPromotionsPage = () => {
  const { id } = useParams();
  const { promotions, loading, error } = useShopPromotionsData(id);

  if (loading) return <p>⏳ Ładowanie promocji...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;
  if (!promotions || promotions.length === 0) return <p>ℹ️ Brak promocji dla sklepu o ID: {id}.</p>;

  // Pobierz nazwę sklepu, jeśli dostępna w danych promocji
  const storeName = promotions[0]?.storeName || `ID: ${id}`;

  return (
    <div className="shop-promotions-page">
      <h2>🎯 Promocje dla sklepu: {storeName}</h2>
      <Promotions dataSource={promotions} /> 
    </div>
  );
};

export default ShopPromotionsPage;
