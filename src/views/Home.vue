<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Popular {{ currentMediaType === 'movie' ? 'Movies' : 'TV Series' }}</h1>
            <div class="flex space-x-4 mt-4 md:mt-0">
                <input v-model="searchQuery" type="text" placeholder="Search..."
                    class="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:border-blue-500"
                    @input="handleSearch" />
                <button @click="toggleMediaType()"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Switch to {{ currentMediaType === 'movie' ? 'TV Series' : 'Movies' }}
                </button>
            </div>
        </div>

        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <Pagination :maxPages="maxPages" @pageChange="handlePageChange" class="pb-5" />

        <MovieList :movies="movies" />
        <Pagination :maxPages="maxPages" @pageChange="handlePageChange" />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchMovies } from '../services/tmdbService';
import MovieList from '../components/MovieList.vue';
import Pagination from '../components/Pagination.vue';
import { useMoviesStore } from '../stores/movies';

const moviesStore = useMoviesStore();
const movies = ref([]);
const currentPage = ref(1);
const maxPages = ref(1);
const currentMediaType = ref('movie');

onMounted(async () => {
    loadPage();
});

async function loadPage() {
    try {
        const response = await fetchMovies(currentMediaType.value, currentPage.value, moviesStore);

        movies.value = response.data;
        maxPages.value = response.totalPages;
    } catch (error) {
        console.error('failed to load ', error);
    }
}

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    loadPage();
}

const toggleMediaType = () => {
    currentMediaType.value = currentMediaType.value === 'movie' ? 'tv' : 'movie';
    currentPage.value = 1;
    loadPage();
}
</script>

<style scoped></style>