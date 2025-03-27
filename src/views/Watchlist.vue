<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Watchlist Movies</h1>
        <MovieList :movies="movies" @card-change="handleCardChange()" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { watchlistState } from '../state/watchlistState';
import MovieList from '../components/MovieList.vue';

const movies = ref([]);

onMounted(async () => {
    loadWatchlist();
});

function loadWatchlist() {
    const watchlist = watchlistState.getWatchlist();

    movies.value = watchlist;
}
function handleCardChange() {
    // console.log("change")
    loadWatchlist();
}
</script>

<style scoped></style>