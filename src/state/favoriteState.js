import { localStorageService } from '../services/localStorageService';

class FavoriteState {
    constructor() {
        this.favorites = this.loadFavorites();
    }

    getFavorits() {
        return this.favorites;
    }

    loadFavorites() {
        const storedFavorites = localStorageService.get("favorits");
        return Array.isArray(storedFavorites) ? storedFavorites : [];
    }

    isFavorite(id) {
        return this.favorites.some(m => m.id == id);
    }

    addFavorite(movie) {
        if (!this.isFavorite(movie.id)) {
            movie.isFavorite = true;
            this.favorites.push(movie);
            this.saveFavorites();
        }
    }

    removeFavorite(movie) {
        this.favorites = this.favorites.filter(m => m.id != movie.id);
        this.saveFavorites();
    }

    toggleFavorite(movie) {
        if (this.isFavorite(movie.id)) {
            this.removeFavorite(movie);
        } else {
            this.addFavorite(movie);
        }
    }

    saveFavorites() {
        localStorageService.set("favorits", this.favorites);
    }
}

export const favoriteState = new FavoriteState();