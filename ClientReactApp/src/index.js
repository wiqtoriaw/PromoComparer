import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Usunięto import './index.css'; jeśli nie korzystasz z Tailwind ani innych globalnych stylów

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
