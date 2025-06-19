// src/presentation/pages/RegisterPage.js
import React, { useState } from 'react';
import AuthService from '../../application/services/AuthService';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await AuthService.register({ name, email, password });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Rejestracja</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Imię"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded p-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded p-2 mb-4"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
