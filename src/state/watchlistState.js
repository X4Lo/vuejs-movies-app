import { localStorageService } from '../services/localStorageService';

class WatchlistState {
    constructor() {
        this.watchlist = this.loadWatchlist();
    }

    loadWatchlist() {
        const storedWatchlist = localStorageService.get("watchlist");
        return Array.isArray(storedWatchlist) ? storedWatchlist : [];
    }

    isInWatchlist(id) {
        return this.watchlist.some(m => m.id == id);
    }

    addWatchlist(movie) {
        if (!this.isInWatchlist(movie.id)) {
            this.watchlist.push(movie);
            this.saveWatchlist();
        }
    }

    removeWatchlist(movie) {
        this.watchlist = this.watchlist.filter(m => m.id !== movie.id);
        this.saveWatchlist();
    }

    toggleWatchlist(movie) {
        if (this.isInWatchlist(movie.id)) {
            this.removeWatchlist(movie);
        } else {
            this.addWatchlist(movie);
        }
    }

    saveWatchlist() {
        localStorageService.set("watchlist", this.watchlist);
    }
}

export const watchlistState = new WatchlistState();