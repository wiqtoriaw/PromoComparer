import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Promotions from './Promotions/PromotionsPage';
import TopPromotions from './Promotions/TopPromotionsPage';
import SearchPromotionsPage from './Promotions/SearchPromotionsPage';
import ShopsPage from './Shops/ShopsPage';
import ShopPromotionsPage from './Shops/ShopPromotionsPage';
import CategoriesPage from './Categories/CategoriesPage';
import CategoryPromotionsPage from './Categories/CategoryPromotionsPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import FavouritesPage from './Pages/FavouritesPage';
import { useAuth } from './hooks/useAuth';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import Navigation from './Navigation/Navigation';
import { useNotification } from './context/NotificationContext';

function App() {
  const { user, setUser, logout } = useAuth();
  const { notification, hideNotification } = useNotification();

  return (
    <Router>
      <Navigation user={user} onLogout={logout} />
      <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)', py: 4 }}>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activepromotions" element={<Promotions />} />
            <Route path="/activepromotions/top" element={<TopPromotions />} />
            <Route path="/activepromotions/search" element={<SearchPromotionsPage />} />
            <Route path="/stores" element={<ShopsPage />} />
            <Route path="/stores/:id" element={<ShopPromotionsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryPromotionsPage />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Routes>
        </Container>
      </Box>
      {notification && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={hideNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={hideNotification} severity={notification.sev} sx={{ width: '100%' }}>
            {notification.msg}
          </Alert>
        </Snackbar>
      )}
    </Router>
  );
}

export default App;
