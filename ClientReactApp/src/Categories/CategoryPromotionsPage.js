import React from 'react';
import { useParams } from 'react-router-dom';
import useCategoryPromotionsData from '../hooks/useCategoryPromotionsData';
import Promotions from '../Promotions/Promotions';
import './CategoryPromotionsPage.css'; // Import stylu dla strony

const CategoryPromotionsPage = () => {
  const { id } = useParams();
  const { promotions, loading, error } = useCategoryPromotionsData(id);

  if (loading) return <p>⏳ Ładowanie promocji dla kategorii...</p>;
  if (error) return <p>❌ Błąd podczas ładowania promocji: {error}</p>;
  if (!promotions || promotions.length === 0) {
    return <p>ℹ️ Brak promocji dla kategorii o ID: {id}.</p>;
  }

  // Pobierz nazwę kategorii, jeśli dostępna w danych promocji
  const categoryName = promotions[0]?.categoryName || `ID: ${id}`;

  return (
    <div className="category-promotions-page">
      <h2>🎯 Promocje dla kategorii: {categoryName}</h2>
      <Promotions dataSource={promotions} />
    </div>
  );
};

export default CategoryPromotionsPage;
