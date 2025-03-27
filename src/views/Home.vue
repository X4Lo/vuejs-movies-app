<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Popular Movies</h1>
        <MovieList :movies="movies" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchMovies } from '../services/tmdbService';
import MovieList from '../components/MovieList.vue';

const movies = ref([]);

onMounted(async () => {
    try {
        const fetchedMovies = await fetchMovies();

        movies.value = fetchedMovies;
        console.log(movies.value)
    } catch (error) {
        console.error('failed to load ', error);
    }
});
</script>

<style scoped></style>