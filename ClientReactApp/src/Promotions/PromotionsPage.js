import React from 'react';
import Promotions from './Promotions';
import promotionsData from '../dummyData/promotionsData';
import './PromotionsPage.css';

const CurrentPromotions = () => {
  return (
    <div className="promotions-page">
      <h1>Aktualne Promocje</h1>
      <Promotions 
        dataSource={promotionsData}
      />
    </div>
  );
};

export default CurrentPromotions;
