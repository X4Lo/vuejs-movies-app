import { localStorageService } from './localStorageService';

class CollectionsStorage {
    constructor() {
        this.collections = this.loadCollections();
    }

    getCollections() {
        return this.collections;
    }

    loadCollections() {
        const storedFavorites = localStorageService.get("collections");
        return Array.isArray(storedFavorites) ? storedFavorites : [];
    }

    saveCollections(collections = this.collections) {
        this.collections = collections;
        localStorageService.set("collections", this.collections);
    }
}

export const collectionsStorage = new CollectionsStorage();