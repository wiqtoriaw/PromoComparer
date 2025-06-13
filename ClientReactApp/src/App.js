import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Home                 from './Home/Home';
import Promotions           from './Promotions/PromotionsPage';
import TopPromotions        from './Promotions/TopPromotionsPage';
import SearchPromotionsPage from './Promotions/SearchPromotionsPage';
import ShopsPage            from './Shops/ShopsPage';
import ShopPromotionsPage   from './Shops/ShopPromotionsPage';
import CategoriesPage       from './Categories/CategoriesPage';
import CategoryPromotionsPage from './Categories/CategoryPromotionsPage';

import LoginPage    from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import FavouritesPage from './Pages/FavouritesPage';
import { useAuth }    from './hooks/useAuth';

function App() {
  const { user, setUser, logout } = useAuth();

  return (
    <Router>
      <Navigation user={user} onLogout={logout} />
      <main>
        <Routes>
          <Route path="/"                           element={<Home />} />
          <Route path="/activepromotions"           element={<Promotions />} />
          <Route path="/activepromotions/top"       element={<TopPromotions />} />
          <Route path="/activepromotions/search"    element={<SearchPromotionsPage />} />
          <Route path="/stores"                     element={<ShopsPage />} />
          <Route path="/stores/:id"                 element={<ShopPromotionsPage />} />
          <Route path="/categories"                 element={<CategoriesPage />} />
          <Route path="/categories/:id"             element={<CategoryPromotionsPage />} />
          <Route path="/login"                      element={<LoginPage onLogin={setUser} />} />
          <Route path="/register"                   element={<RegisterPage />} />
          <Route path="/favourites"                 element={<FavouritesPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
