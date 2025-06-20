// --- src/App.js ---
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './presentation/components/Header';
import HomePage from './presentation/pages/HomePage';
import ActivePromotionsPage from './presentation/pages/ActivePromotionsPage';
import TopPromotionsPage from './presentation/pages/TopPromotionsPage';
import CategoriesPage from './presentation/pages/CategoriesPage';
import CategoryPromotionsPage from './presentation/pages/CategoryPromotionsPage';
import StoresPage from './presentation/pages/StoresPage';
import StorePromotionsPage from './presentation/pages/StorePromotionsPage';
import SearchPage from './presentation/pages/SearchPage';
import FavouritesPage from './presentation/pages/FavouritesPage';
import LoginPage from './presentation/pages/LoginPage';
import RegisterPage from './presentation/pages/RegisterPage';
import { AuthProvider } from './presentation/context/AuthContext';
import { FavouritesProvider } from './presentation/context/FavouritesContext';
import { NotificationProvider } from './presentation/context/NotificationContext';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <FavouritesProvider>
          <NotificationProvider>
            <Router>
              <Header />
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Routes>
                  {/* Landing page */}
                  <Route path="/" element={<HomePage />} />
                  {/* All active promotions */}
                  <Route path="/promotions" element={<ActivePromotionsPage />} />
                  {/* Top 10 promotions */}
                  <Route path="/toppromotions" element={<TopPromotionsPage />} />
                  {/* Categories */}
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/categories/:categoryId" element={<CategoryPromotionsPage />} />
                  {/* Stores */}
                  <Route path="/stores" element={<StoresPage />} />
                  <Route path="/stores/:storeId" element={<StorePromotionsPage />} />
                  {/* Search */}
                  <Route path="/search" element={<SearchPage />} />
                  {/* Favourites */}
                  <Route path="/favorites" element={<FavouritesPage />} />
                  {/* Auth */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </Container>
            </Router>
          </NotificationProvider>
        </FavouritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}