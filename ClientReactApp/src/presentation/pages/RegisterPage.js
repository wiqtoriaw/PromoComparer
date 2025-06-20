// src/presentation/pages/RegisterPage.js

import React from 'react';
import AuthService from '../../application/services/AuthService';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const handleSubmit = async ({ email, password }) => {
    await AuthService.register({ email, password });
    window.location.href = '/login';
  };

  return (
    <AuthForm
      title="Rejestracja"
      submitLabel="Zarejestruj się"
      onSubmit={handleSubmit}
    />
  );
}
