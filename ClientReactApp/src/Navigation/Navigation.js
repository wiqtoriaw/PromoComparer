import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Strona Główna</Link>
        </li>
        <li className="nav-item">
          <Link to="/promotions">Promocje</Link>
        </li>
        <li className="nav-item">
          <Link to="/promotions/top">Największe Promocje</Link>
        </li>
        <li className="nav-item">
          <Link to="/categories">Kategorie</Link>
        </li>
        <li className="nav-item">
          <Link to="/shops">Sklepy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
