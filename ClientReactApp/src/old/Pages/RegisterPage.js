// src/Pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

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
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rejestracja
        </Typography>
        <form onSubmit={submit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Hasło"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Zarejestruj
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
