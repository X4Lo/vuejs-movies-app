export default class Movie {
    constructor(data) {
        console.log(data)
        this.id = data.id;
        this.title = data.title || 'Unknown Title';
        this.isTvSerie = data.seasons ? true : false;
        this.overview = data.overview || 'No overview available';
        this.posterPath = data.poster_path;
        this.backdropPath = data.backdrop_path;
        this.releaseDate = data.release_date || 'Unknown Date';
        this.genresIds = data.genres_ids;
        this.isFavorit = false;
        this.isInWatchlist = false;
    }
}