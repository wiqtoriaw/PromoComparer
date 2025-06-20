// --- src/presentation/components/Header.js ---
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuth from '../../application/hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: 'secondary.light' } }}
        >
          PromoComparer
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/search">Szukaj</Button>
          <Button color="inherit" component={RouterLink} to="/promotions">Promocje</Button>
          <Button color="inherit" component={RouterLink} to="/toppromotions">Top 10</Button>
          <Button color="inherit" component={RouterLink} to="/stores">Sklepy</Button>
          <Button color="inherit" component={RouterLink} to="/categories">Kategorie</Button>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/favorites">Ulubione</Button>
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