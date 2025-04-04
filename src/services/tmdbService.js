import axios from 'axios';
import Movie from '../models/Movie';

const API_KEY = 'a667a330eea5e68ce051215dc1034926';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(type = 'movie', page = 1, moviesStore) {
    try {
        const response = await axios.get(`${BASE_URL}/${type}/popular`, {
            params: { api_key: API_KEY, page: page },
        });

        const movies = await Promise.all(
            response.data.results.map(async (movieData) => {
                const movie = moviesStore.getMovieById(movieData.id) || new Movie(movieData);

                return movie;
            })
        );

        return {
            data: movies,
            totalPages: response.data.total_pages
        };
    } catch (error) {
        console.error('error fetching', error);
        throw error;
    }
}

export async function fetchMoviesByName(query, page = 1, moviesStore) {
    try {
        const response = await axios.get(`${BASE_URL}/search/multi?include_adult=false&language=en-US`, {
            params: { api_key: API_KEY, page: page, query: query },
        });

        const movies = await Promise.all(
            response.data.results.filter(i => !Object.hasOwn(i, 'gender')).map(async (movieData) => {
                const movie = moviesStore.getMovieById(movieData.id) || new Movie(movieData);

                return movie;
            })
        );

        return {
            data: movies,
            totalPages: response.data.total_pages
        };
    } catch (error) {
        console.error('error fetching', error);
        throw error;
    }
}