export default class Movie {
    constructor(data) {
        this.id = data.id;
        this.title = data.title || data.name || 'Unknown Title';
        this.isTvSerie = data.seasons ? true : false;
        this.overview = data.overview || 'No overview available';
        this.posterPath = data.poster_path;
        this.backdropPath = data.backdrop_path;
        this.releaseDate = data.release_date || data.first_air_date || 'Unknown Date';
        this.rating = data.vote_average;
        this.genresIds = data.genres_ids;
        this.isFavorit = false;
        this.isInWatchlist = false;
    }
}