import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import { FavouritesProvider } from './context/FavouritesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>  
    </AuthProvider>,
  </React.StrictMode>
);
