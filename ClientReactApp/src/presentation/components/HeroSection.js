import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        py: 10,
        my: 4,
        borderRadius: 4,
        overflow: 'hidden',
        background: theme =>
          `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.primary.main} 90%)`,
        color: 'primary.contrastText',
        boxShadow: theme => `0 8px 32px 0 ${theme.palette.primary.dark}50`,
      }}
    >
      {/* Dekoracje */}
      <Box
        sx={{
          position: 'absolute',
          top: -75,
          left: -75,
          width: 200,
          height: 200,
          bgcolor: 'secondary.main',
          opacity: 0.3,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -125,
          right: -125,
          width: 250,
          height: 250,
          bgcolor: 'primary.dark',
          opacity: 0.3,
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />
      <Container sx={{ position: 'relative' }}>
        <motion.div variants={itemVariants}>
          <Typography variant="h2" component="h1" gutterBottom>
            Witaj w PromoComparer!
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="h5" component="p" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Twoje centrum najlepszych promocji. Oszczędzaj z nami!
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/promotions"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: '50px',
              fontWeight: 'bold',
              boxShadow: theme => `0 4px 14px 0 ${theme.palette.primary.main}70`,
            }}
          >
            Zobacz wszystkie promocje
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
