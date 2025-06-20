// src/presentation/pages/LoginPage.js

import React from 'react';
import useAuth from '../../application/hooks/useAuth';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const { login } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    await login({ email, password });
    window.location.href = '/';
  };

  return (
    <AuthForm
      title="Logowanie"
      submitLabel="Zaloguj się"
      onSubmit={handleSubmit}
    />
  );
}
