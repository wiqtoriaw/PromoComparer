import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/activepromotions">Promocje</Link>
        </li>
        <li className="nav-item">
          <Link to="/activepromotions/top">Największe Promocje</Link>
        </li>
        <li className="nav-item">
          <Link to="/activepromotions/search">Wyszukiwarka</Link>
        </li>
        <li className="nav-item">
          <Link to="/categories">Kategorie</Link>
        </li>
        <li className="nav-item">
          <Link to="/stores">Sklepy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
