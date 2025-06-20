import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import sunsetTheme from './theme';
import { AuthProvider } from './presentation/context/AuthContext';
import { FavouritesProvider } from './presentation/context/FavouritesContext';
import { NotificationProvider } from './presentation/context/NotificationContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={sunsetTheme}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
