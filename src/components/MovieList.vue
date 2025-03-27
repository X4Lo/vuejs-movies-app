<template>
    <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6">
        <MovieCard 
            v-for="movie in props.movies" 
            :key="movie.id" 
            :movie="movie"
            @toggle-favorite="handleToggleFavorite(movie)"
            @toggle-watchlist="handleToggleWatchlist(movie)"
        />
    </div>
</template>

<script setup>
import MovieCard from '../components/MovieCard.vue';

const props = defineProps({
    movies: {
        type: Array,
        required: true,
    },
});

console.log(props)

const handleToggleFavorite = (movie) => {
    console.log('Toggle Favorite:', movie);
};

const handleToggleWatchlist = (movie) => {
    console.log('Toggle Watchlist:', movie);
};
</script>