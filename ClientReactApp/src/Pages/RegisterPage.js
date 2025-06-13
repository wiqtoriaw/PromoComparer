// src/Pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';  // zakładam, że zwraca { register }

export default function RegisterPage() {
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');    // zmieniamy nazwę na password
  const [error, setError]     = useState('');
  const navigate               = useNavigate();
  const { register }           = useAuth();

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email i hasło są wymagane');
      return;
    }
    try {
      // przekazujemy obiekt, nie dwa oddzielne argumenty
      await register({ email, password });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Rejestracja nie powiodła się');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Rejestracja</h2>
        <form onSubmit={submit} className="login-form">
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={e => setPass(e.target.value)}
            required
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-button">
            Zarejestruj
          </button>
        </form>
      </div>
    </div>
  );
}
