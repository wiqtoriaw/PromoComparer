// src/container.js
import AuthService from './application/services/AuthService';
import CategoryService from './application/services/CategoryService';
import PromotionService from './application/services/PromotionService';
import FavouritesService from './application/services/FavouritesService';

const container = {
  auth: AuthService,
  categories: CategoryService,
  promotions: PromotionService,
  favourites: FavouritesService,
};

export default container;