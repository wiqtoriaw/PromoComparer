// src/Pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';
import { useAuth }         from '../hooks/useAuth';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail]     = useState('');
  const [password, setPass]   = useState('');
  const [error, setError]     = useState('');
  const navigate               = useNavigate();
  const { login }             = useAuth();

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Logowanie nie powiodło się');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Logowanie</h2>
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
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}
