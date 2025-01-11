import React from 'react';
import { useParams } from 'react-router-dom';
import promotionsData from '../dummyData/promotionsData';
import categoriesData from '../dummyData/categoriesData';
import Promotions from './Promotions';

const CategoryPromotionsPage = () => {
  const { id } = useParams();
  const category = categoriesData.find(cat => cat.id === Number(id));

  if (!category) {
    return <p>❌ Nie znaleziono kategorii o podanym ID.</p>;
  }

  const filteredPromotions = promotionsData.filter(promo => promo.category === category.name);

  return (
    <div>
      <h2>🎯 Promocje dla kategorii: {category.name}</h2>
      <Promotions dataSource={filteredPromotions} title={`Promocje: ${category.name}`} />
    </div>
  );
};

export default CategoryPromotionsPage;
