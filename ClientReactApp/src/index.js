import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FavouritesProvider } from './context/FavouritesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< Updated upstream
    <App />
=======
    <AuthProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>  
    </AuthProvider>,
>>>>>>> Stashed changes
  </React.StrictMode>
);
