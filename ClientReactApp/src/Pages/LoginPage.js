// src/Pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    try {
      await login({ email, password: pass });
      nav('/');
    } catch (err) {
      setError(err.message || 'Logowanie nie powiodło się');
    }
  }

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
          />
          <input
            className="login-input"
            type="password"
            placeholder="Hasło"
            value={pass}
            onChange={e => setPass(e.target.value)}
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
