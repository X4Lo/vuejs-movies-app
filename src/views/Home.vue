<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Popular Movies</h1>
        <MovieList :movies="movies" />
        <Pagination :maxPages="600" @pageChange="handlePageChange" />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchMovies } from '../services/tmdbService';
import MovieList from '../components/MovieList.vue';
import Pagination from '../components/Pagination.vue';

const movies = ref([]);
const currentPage = ref(1);

onMounted(async () => {
    loadPage();
});

async function loadPage() {
    try {
        const fetchedMovies = await fetchMovies(currentPage.value);

        movies.value = fetchedMovies;
        console.log(movies.value)
    } catch (error) {
        console.error('failed to load ', error);
    }
}

function handlePageChange(newPage) {
    currentPage.value = newPage;
    loadPage();
};
</script>

<style scoped></style>