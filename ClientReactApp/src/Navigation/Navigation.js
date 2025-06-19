// src/Navigation/Navigation.js
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navigation() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'secondary.light',
            },
          }}
        >
          PromoComparer
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/activepromotions/search">Szukaj</Button>
          <Button color="inherit" component={RouterLink} to="/activepromotions">Promocje</Button>
          <Button color="inherit" component={RouterLink} to="/activepromotions/top">Top</Button>
          <Button color="inherit" component={RouterLink} to="/stores">Sklepy</Button>
          <Button color="inherit" component={RouterLink} to="/categories">Kategorie</Button>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/favourites">Ulubione</Button>
              <Button color="inherit" onClick={handleLogout}>Wyloguj</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Zaloguj</Button>
              <Button color="inherit" component={RouterLink} to="/register">Rejestracja</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
