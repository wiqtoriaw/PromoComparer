// src/presentation/components/AuthForm.js

import React, { useState } from 'react';
import { TextField, Button, Alert, Box, Typography } from '@mui/material';

export default function AuthForm({
  title = "Formularz",
  onSubmit,
  submitLabel = "Wyślij",
  error: externalError,
  initialEmail = "",
  initialPassword = "",
}) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h5" mb={2}>{title}</Typography>
      {(error || externalError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || externalError}
        </Alert>
      )}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Hasło"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {submitLabel}
      </Button>
    </Box>
  );
}
