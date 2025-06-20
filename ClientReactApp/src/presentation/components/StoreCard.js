// src/presentation/components/StoreCard.js

import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link as RouterLink } from 'react-router-dom';

export default function StoreCard({ shop }) {
  return (
    <Card
      sx={{
        height: 135,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: theme =>
          `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.primary.main} 90%)`,
        color: 'primary.contrastText',
        boxShadow: theme => `0 8px 24px 0 ${theme.palette.primary.dark}30`,
        transition: 'transform .18s, box-shadow .18s',
        '&:hover': {
          transform: 'translateY(-5px) scale(1.025)',
          boxShadow: theme => `0 14px 36px 0 ${theme.palette.primary.dark}60`,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/stores/${shop.id}`}
        sx={{ height: '100%', display: 'flex', alignItems: 'center', px: 2 }}
      >
        <StorefrontIcon sx={{ fontSize: 44, color: '#000', mr: 2 }} />
        <CardContent sx={{ flexGrow: 1, minWidth: 0, px: 1 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              color: 'primary.contrastText',
              fontWeight: 600,
              letterSpacing: '.02em',
              textShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}
          >
            {shop.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
