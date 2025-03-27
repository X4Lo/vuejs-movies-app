import axios from 'axios';
import Movie from '../models/Movie';
import { favoriteState } from '../state/favoriteState';
import { watchlistState } from '../state/watchlistState';

const API_KEY = 'a667a330eea5e68ce051215dc1034926';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies() {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: { api_key: API_KEY },
        });

        const movies = await Promise.all(
            response.data.results.map(async (movieData) => {
                const movie = new Movie(movieData);
                movie.isFavorit = favoriteState.isFavorite(movie.id);
                movie.isInWatchlist = watchlistState.isInWatchlist(movie.id);
                return movie;
            })
        );

        return movies;
    } catch (error) {
        console.error('error fetching', error);
        throw error;
    }
}