import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          py: 10,
          my: 4,
          borderRadius: 4,
          overflow: 'hidden',
          background: (theme) =>
            `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.primary.main} 90%)`,
          color: 'primary.contrastText',
          boxShadow: (theme) =>
            `0 8px 32px 0 ${theme.palette.primary.dark}50`,
        }}
      >
        <Box
          component="div"
          sx={{
            width: '200px',
            height: '200px',
            backgroundColor: 'secondary.main',
            opacity: 0.3,
            position: 'absolute',
            top: -75,
            left: -75,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
         <Box
          component="div"
          sx={{
            width: '250px',
            height: '250px',
            backgroundColor: 'primary.dark',
            opacity: 0.3,
            position: 'absolute',
            bottom: -125,
            right: -125,
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
            <Typography variant="h5" component="p" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Twoje centrum najlepszych promocji. Oszczędzaj z nami!
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/activepromotions"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                fontWeight: 'bold',
                boxShadow: (theme) => `0 4px 14px 0 ${theme.palette.primary.main}70`,
              }}
            >
              Zobacz wszystkie promocje
            </Button>
          </motion.div>
        </Container>
      </Box>

      <Grid container spacing={4}>
        {[
          { icon: <SearchIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />, title: 'Szukaj Promocji', text: 'Znajdź najlepsze okazje, wyszukując konkretne produkty.' },
          { icon: <StorefrontIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />, title: 'Przeglądaj Sklepy', text: 'Zobacz promocje dostępne w Twoich ulubionych sklepach.' },
          { icon: <CategoryIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />, title: 'Filtruj po Kategoriach', text: 'Sortuj okazje według kategorii produktów, które Cię interesują.' },
        ].map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                  },
                }}
              >
                {feature.icon}
                <Typography variant="h6">{feature.title}</Typography>
                <Typography>{feature.text}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default Home;
