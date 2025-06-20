import React from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import FeatureBox from './FeatureBox';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const FEATURES = [
  {
    icon: <SearchIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />,
    title: 'Szukaj Promocji',
    text: 'Znajdź najlepsze okazje, wyszukując konkretne produkty.',
    to: '/search',
  },
  {
    icon: <StorefrontIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />,
    title: 'Przeglądaj Sklepy',
    text: 'Zobacz promocje dostępne w Twoich ulubionych sklepach.',
    to: '/stores',
  },
  {
    icon: <CategoryIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />,
    title: 'Filtruj po Kategoriach',
    text: 'Sortuj okazje według kategorii produktów, które Cię interesują.',
    to: '/categories',
  },
];

export default function FeatureSection() {
  return (
    <Grid container spacing={4} sx={{ px: 2, mb: 4 }}>
      {FEATURES.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <motion.div variants={itemVariants}>
            <FeatureBox {...feature} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
