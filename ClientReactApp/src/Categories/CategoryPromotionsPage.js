import React from 'react';
import { useParams } from 'react-router-dom';
import useCategoryPromotionsData from '../hooks/useCategoryPromotionsData';
import Promotions from '../Promotions/Promotions';
import './CategoryPromotionsPage.css'; // Import stylu dla strony

const CategoryPromotionsPage = () => {
  const { id } = useParams();
  const { promotions, loading, error } = useCategoryPromotionsData(id);

  if (loading) return <p>⏳ Ładowanie promocji...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;
  if (!promotions || promotions.length === 0) {
    return <p>❌ Brak promocji dla podanej kategorii.</p>;
  }

  return (
    <div className="category-promotions-page">
      <h2>🎯 Promocje dla kategorii: {id}</h2>
      <Promotions dataSource={promotions} />
    </div>
  );
};

export default CategoryPromotionsPage;
