import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Promotions from './Promotions/PromotionsPage';
import TopPromotions from './Promotions/TopPromotionsPage';
import ShopsPage from './Shops/ShopsPage';
import ShopPromotionsPage from './Shops/ShopPromotionsPage';
import CategoriesPage from './Categories/CategoriesPage';
import CategoryPromotionsPage from './Promotions/CategoryPromotionsPage';


function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/promotions/top" element={<TopPromotions />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/shops/:id/promotions" element={<ShopPromotionsPage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id/promotions" element={<CategoryPromotionsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
