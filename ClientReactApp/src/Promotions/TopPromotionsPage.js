import React from 'react';
import Promotions from './Promotions';
import useTopPromotionsData from '../hooks/useTopPromotionsData';
import './PromotionsPage.css';

const CurrentPromotions = () => {
  const { topPromotions, loading, error } = useTopPromotionsData();

  if (loading) return <p>⏳ Ładowanie promocji...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;

  return (
    <div className="promotions-page">
      <h1>Top10 Promocji</h1>
      <Promotions 
        dataSource={topPromotions}
      />
    </div>
  );
};

export default CurrentPromotions;
