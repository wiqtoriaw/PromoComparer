import React from 'react';
import Promotions from './Promotions';
import promotionsData from '../dummyData/promotionsData';

const CurrentPromotions = () => {
  return (
    <Promotions 
      dataSource={promotionsData} 
      title="Lista Promocji" 
    />
  );
};

export default CurrentPromotions;
