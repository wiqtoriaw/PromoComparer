// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './presentation/components/Header';
import HomePage from './presentation/pages/HomePage';
import CategoriesPage from './presentation/pages/CategoriesPage';
import CategoryPromotionsPage from './presentation/pages/CategoryPromotionsPage';
import FavouritesPage from './presentation/pages/FavouritesPage';
import LoginPage from './presentation/pages/LoginPage';
import RegisterPage from './presentation/pages/RegisterPage';
import { AuthProvider } from './presentation/context/AuthContext';
import { FavouritesProvider } from './presentation/context/FavouritesContext';
import { NotificationProvider } from './presentation/context/NotificationContext';

export default function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <NotificationProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:categoryId" element={<CategoryPromotionsPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}