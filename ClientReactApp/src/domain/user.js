// src/domain/user.js

class User {
  constructor({ id, name, email, token = null, favourites = [] }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.favourites = Array.isArray(favourites) ? favourites : [];
  }

  addFavourite(promotionId) {
    if (!this.favourites.includes(promotionId)) {
      this.favourites.push(promotionId);
    }
  }

  removeFavourite(promotionId) {
    this.favourites = this.favourites.filter(id => id !== promotionId);
  }

  hasFavourite(promotionId) {
    return this.favourites.includes(promotionId);
  }

  updateToken(newToken) {
    this.token = newToken;
  }
}

export default User;