// src/presentation/components/CategoryList.js
import React from 'react';
import useCategoryData from '../../application/hooks/useCategoryData';
import CategoryCard from './CategoryCard';
import { Grid, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08 }
  }
};
const itemVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export default function CategoryList() {
  const { data: categories, loading, error } = useCategoryData();

  if (loading) return <CircularProgress sx={{ display: 'block', my: 4, mx: 'auto' }} />;
  if (error) return <Alert severity="error">Błąd ładowania: {error.message}</Alert>;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <motion.div variants={itemVariants}>
              <CategoryCard category={category} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}
