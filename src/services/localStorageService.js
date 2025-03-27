class LocalStorageService {
    set(key, value) {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    }

    get(key) {
        if (!localStorage.getItem(key)) return null

        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
    }

    remove(key) {
        if (localStorage.getItem(key))
            localStorage.removeItem(key);
    }
}

export const localStorageService = new LocalStorageService();