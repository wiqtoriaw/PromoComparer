// src/Pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';
import { useAuth }         from '../hooks/useAuth';
import './LoginPage.css';   // lub inny plik stylów

export default function RegisterPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                 = useNavigate();
  const { register }             = useAuth();

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email i hasło są wymagane');
      return;
    }
    try {
      await register({ email, password });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Rejestracja nie powiodła się');
    }
  };

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
            onChange={e => setPassword(e.target.value)}
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
