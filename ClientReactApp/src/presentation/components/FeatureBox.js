import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function FeatureBox({ icon, title, text, to }) {
  return (
    <Paper
      elevation={0}
      component={RouterLink}
      to={to}
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 2,
        textDecoration: 'none',
        transition: 'box-shadow .2s, border-color .2s, transform .2s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transform: 'scale(1.04)',
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText'
        },
        display: 'block',
        cursor: 'pointer',
        minHeight: 180,
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
      <Typography>{text}</Typography>
    </Paper>
  );
}
