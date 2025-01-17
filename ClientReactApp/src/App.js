import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Promotions from './Promotions/PromotionsPage';
import TopPromotions from './Promotions/TopPromotionsPage';
import ShopsPage from './Shops/ShopsPage';
import ShopPromotionsPage from './Shops/ShopPromotionsPage';
import CategoriesPage from './Categories/CategoriesPage';
import CategoryPromotionsPage from './Categories/CategoryPromotionsPage';
import SearchPromotionsPage from './Promotions/SearchPromotionsPage';


function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activepromotions" element={<Promotions />} />
          <Route path="/activepromotions/top" element={<TopPromotions />} />
          <Route path="/activepromotions/search" element={<SearchPromotionsPage />} />
          <Route path="/stores" element={<ShopsPage />} />
          <Route path="/stores/:id" element={<ShopPromotionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryPromotionsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
