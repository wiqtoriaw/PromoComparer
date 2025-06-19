// src/domain/user.js
// Encja reprezentująca użytkownika

class User {
  constructor({ id, name, email, token = null, favourites = [] }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.favourites = Array.isArray(favourites) ? favourites : [];
  }

  // Dodaj promocję do ulubionych
  addFavourite(promotionId) {
    if (!this.favourites.includes(promotionId)) {
      this.favourites.push(promotionId);
    }
  }

  // Usuń promocję z ulubionych
  removeFavourite(promotionId) {
    this.favourites = this.favourites.filter(id => id !== promotionId);
  }

  // Sprawdza, czy promocja jest w ulubionych
  hasFavourite(promotionId) {
    return this.favourites.includes(promotionId);
  }

  // Aktualizuj token (np. po logowaniu/odświeżeniu)
  updateToken(newToken) {
    this.token = newToken;
  }
}

export default User;