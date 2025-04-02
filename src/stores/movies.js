import { defineStore } from 'pinia';
import { moviesStorage } from '../services/moviesStorage';

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: moviesStorage.getMovies(),
        allLists: [
            { id: 1, name: 'Favorites' },
            { id: 2, name: 'Watch Later' },
            { id: 3, name: 'Action Movies' },
            { id: 4, name: 'Comedy Movies' },
        ],
    }),
    actions: {
        toggleFavorite(movieId) {
            const movie = this.movies.find((m) => m.id == movieId);
            if (movie) {
                movie.isFavorit = !movie.isFavorit;
                moviesStorage.saveMovies(this.movies);
            }
        },
        toggleWatchlist(movieId) {
            const movie = this.movies.find((m) => m.id === movieId);
            if (movie) {
                movie.isInWatchlist = !movie.isInWatchlist;
            }
        },
        updateMovieLists(movieId, newLists) {
            const movie = this.movies.find((m) => m.id === movieId);
            if (movie) {
                movie.lists = newLists;
            }
        },
        addNewMovie(movie) {
            this.movies.push({ ...movie, id: Date.now(), lists: [] });
        },
    },
    getters: {
        getMovieById: (state) => (id) => state.movies.find((m) => m.id === id),
        favoriteMovies: (state) => state.movies.filter((m) => m.isFavorit),
        watchlistMovies: (state) => state.movies.filter((m) => m.isInWatchlist),
    },
});