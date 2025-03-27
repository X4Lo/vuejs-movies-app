<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Favorite Movies</h1>
        <MovieList :movies="movies" @card-change="handleCardChange()" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { favoriteState } from '../state/favoriteState';
import MovieList from '../components/MovieList.vue';

const movies = ref([]);

onMounted(async () => {
    loadFavorites();
});

function loadFavorites() {
    const favorites = favoriteState.getFavorits();

    movies.value = favorites;
}
function handleCardChange() {
    // console.log("change")
    loadFavorites();
}
</script>

<style scoped></style>