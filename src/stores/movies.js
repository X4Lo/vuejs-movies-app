import { defineStore } from 'pinia';
import { moviesStorage } from '../services/moviesStorage';
import { collectionsStorage } from '../services/collectionsStorage';

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: moviesStorage.getMovies(),
        collections: collectionsStorage.getCollections(),
    }),
    actions: {
        toggleFavorite(movie) {
            const oldMovie = this.movies.find((m) => m.id == movie.id);
            if (oldMovie) {
                oldMovie.isFavorit = !oldMovie.isFavorit;
            } else {
                movie.isFavorit = true;
                this.movies.push(movie);
            }
            moviesStorage.saveMovies(this.movies);
        },
        toggleWatchlist(movie) {
            const oldMovie = this.movies.find((m) => m.id === movie.id);
            if (oldMovie) {
                oldMovie.isInWatchlist = !oldMovie.isInWatchlist;
            } else {
                movie.isInWatchlist = true;
                this.movies.push(movie);
            }
            moviesStorage.saveMovies(this.movies);
        },
        isMovieInCollection(movieId, collectionId) {
            const collection = this.collections.find((c) => c.id === collectionId);

            if (!collection) return false;
            if (!collection.movies) return false;

            return collection.movies.includes(movieId);
        },
        toggleMovieInCollection(movieId, collectionId) {
            const collection = this.collections.find((l) => l.id === collectionId);

            if (!collection.movies)
                collection.movies = []

            if (collection.movies.includes(movieId)) {
                collection.movies = collection.movies.filter(id => id != movieId);
            } else {
                collection.movies.push(movieId);
            }

            collectionsStorage.saveCollections();
        },
        addNewCollection(name) {
            this.collections.push({ name: name, id: Date.now(), movies: [] });
            collectionsStorage.saveCollections();
        },
        reorderCollectionMovies(id, newOrder) {
            const collection = this.collections.find((l) => l.id === id);

            // console.log(`old order: ${collection.movies}`)
            // console.log(`new order: ${newOrder}`)
            collection.movies = newOrder;
            // console.log(`fix order: ${collection.movies}`)
            collectionsStorage.saveCollections();
        }
    },
    getters: {
        getMovieById: (state) => (id) => state.movies.find((m) => m.id === id),
        getCollectionById: (state) => (id) => state.collections.find((c) => c.id == id),
        getCollectionMovies: (state) => (id) => state.movies.filter((m) => {
            const collection = state.getCollectionById(id);

            return collection.movies.includes(m.id);
        }),
        favoriteMovies: (state) => state.movies.filter((m) => m.isFavorit),
        watchlistMovies: (state) => state.movies.filter((m) => m.isInWatchlist),
        getCollections: (state) => state.collections,
    },
});