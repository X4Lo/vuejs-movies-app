<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Popular {{ currentMediaType === 'movie' ? 'Movies' : 'TV Series' }}</h1>
            <div class="flex space-x-4 mt-4 md:mt-0">
                <input v-model="searchQuery" type="text" placeholder="Search..."
                    class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:border-blue-500"
                    @input="onInputChange" />
                <button @click="toggleMediaType()"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Switch to {{ currentMediaType === 'movie' ? 'TV Series' : 'Movies' }}
                </button>
            </div>
        </div>

        <Pagination :maxPages="maxPages" @pageChange="handlePageChange" class="pb-5" />
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <MovieList :movies="movies" />
        <Pagination :maxPages="maxPages" @pageChange="handlePageChange" />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchMovies, fetchMoviesByName } from '../services/tmdbService';
import MovieList from '../components/MovieList.vue';
import Pagination from '../components/Pagination.vue';
import { useMoviesStore } from '../stores/movies';

const moviesStore = useMoviesStore();
const searchQuery = ref("");
const movies = ref([]);
const currentPage = ref(1);
const maxPages = ref(1);
const currentMediaType = ref('movie');
const loading = ref(true);
let timeoutId = null;

onMounted(async () => {
    loadPage();
});

const loadPage = async () => {
    try {
        loading.value = true;
        movies.value = [];

        const response = await fetchMovies(currentMediaType.value, currentPage.value, moviesStore);

        movies.value = response.data;
        maxPages.value = response.totalPages;
    } catch (error) {
        console.error('failed to load ', error);
    } finally {
        loading.value = false;
    }
}

const doSearch = async () => {
    try {
        console.log(`hh`)
        loading.value = true;
        movies.value = [];

        const response = await fetchMoviesByName(searchQuery.value, currentPage.value, moviesStore);

        movies.value = response.data;
        maxPages.value = response.totalPages;
    } catch (error) {
        console.error('failed to load ', error);
    } finally {
        loading.value = false;
    }
}

const handlePageChange = (newPage) => {
    if (newPage != currentPage.value) {
        currentPage.value = newPage;
        if (searchQuery.value.trim() != "") {
            doSearch()
        } else {
            loadPage();
        }
    }
}

const onInputChange = () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
        if (searchQuery.value.trim()) {
            doSearch();
        }
    }, 300);
};

const toggleMediaType = () => {
    currentMediaType.value = currentMediaType.value === 'movie' ? 'tv' : 'movie';
    currentPage.value = 1;
    loadPage();
}
</script>

<style scoped></style>