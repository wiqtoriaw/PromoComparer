// src/Navigation/Navigation.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navigation.css';

export default function Navigation() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/activepromotions/search" className="nav-link">Szukaj</Link>
        </li>
        <li className="nav-item">
          <Link to="/activepromotions" className="nav-link">Promocje</Link>
        </li>
        <li className="nav-item">
          <Link to="/activepromotions/top" className="nav-link">Top</Link>
        </li>
        <li className="nav-item">
          <Link to="/stores" className="nav-link">Sklepy</Link>
        </li>
        <li className="nav-item">
          <Link to="/categories" className="nav-link">Kategorie</Link>
        </li>

        {user ? (
          <>
            <li className="nav-item">
              <Link to="/favourites" className="nav-link">Ulubione</Link>
            </li>
            <li
              className="nav-item clickable"
              onClick={handleLogout}
            >
              <span className="nav-link">Wyloguj</span>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Zaloguj</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Rejestracja</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
