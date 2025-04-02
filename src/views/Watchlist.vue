<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Watchlist Movies</h1>
        <MovieList :movies="movies" @card-change="handleCardChange()" />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import MovieList from '../components/MovieList.vue';
import { useMoviesStore } from '../stores/movies';

const moviesStore = useMoviesStore();
const movies = computed(() => moviesStore.watchlistMovies);

onMounted(async () => {
});


function handleCardChange() {
}
</script>

<style scoped></style>