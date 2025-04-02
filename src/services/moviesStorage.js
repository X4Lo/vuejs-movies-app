import { localStorageService } from './localStorageService';

class MoviesStorage {
    constructor() {
        this.movies = this.loadMovies();
    }

    getMovies() {
        return this.movies;
    }

    loadMovies() {
        const storedFavorites = localStorageService.get("movies");
        return Array.isArray(storedFavorites) ? storedFavorites : [];
    }

    saveMovies(movies = this.movies) {
        this.movies = movies;
        localStorageService.set("movies", this.movies);
    }
}

export const moviesStorage = new MoviesStorage();