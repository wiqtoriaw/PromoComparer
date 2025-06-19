// src/presentation/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Promocje App
        </Typography>
        <Button component={RouterLink} to="/categories" color="inherit">Kategorie</Button>
        <Button component={RouterLink} to="/favourites" color="inherit">Ulubione</Button>
        <Button component={RouterLink} to="/login" color="inherit">Logowanie</Button>
      </Toolbar>
    </AppBar>
  );
}
