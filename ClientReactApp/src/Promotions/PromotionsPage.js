import React from 'react';
import Promotions from './Promotions';
import usePromotionsData from '../hooks/usePromotionsData';
import './PromotionsPage.css';

const CurrentPromotions = () => {
  const { promotions, loading, error } = usePromotionsData();

  if (loading) return <p>⏳ Ładowanie promocji...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;

  return (
    <div className="promotions-page">
      <h1>Aktualne Promocje</h1>
      <Promotions 
        dataSource={promotions}
      />
    </div>
  );
};

export default CurrentPromotions;
