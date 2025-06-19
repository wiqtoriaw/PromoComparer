import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import { FavouritesProvider } from './context/FavouritesContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const sunsetTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff7043', // Deep Orange
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#7e57c2', // Deep Purple
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #4a148c 30%, #ff6f00 90%)', // Purple to Amber
          color: '#ffffff',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
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
