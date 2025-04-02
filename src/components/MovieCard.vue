<template>
    <div
        class="relative bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-lg h-full">
        <img v-if="movie.posterPath" :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`" :alt="movie.title"
            class="w-full object-cover aspect-[2/3]" />

        <div class="p-4">
            <h3 class="text-lg font-bold transition-colors duration-300 hover:text-blue-600">
                {{ movie.title }}
            </h3>
            <p class="text-xs text-gray-500 mt-2">Released: {{ movie.releaseDate }}</p>
        </div>

        <div
            class="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center space-y-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div class="flex pt-2 flex-end">
                <button class="text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    @click="toggleFavorite">
                    <HeartIcon :class="[movie.isFavorit ? 'text-red-500' : 'text-white']" class="h-6 w-6" />
                </button>

                <button class="text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    @click="toggleWatchlist">
                    <BookmarkIcon :class="[movie.isInWatchlist ? 'text-blue-500' : 'text-white']" class="h-6 w-6" />
                </button>

                <button class="text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
                    @click="showListsDialog">
                    <PlusIcon class="text-white h-6 w-6" />

                </button>
            </div>

            <p class="text-sm text-white text-center mt-4 mx-3">{{ movie.overview }}</p>
        </div>
    </div>
</template>

<script setup>
import { HeartIcon, BookmarkIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { useMoviesStore } from '../stores/movies';

const { movie } = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

const moviesStore = useMoviesStore();
const emit = defineEmits(['toggle-favorite', 'toggle-watchlist']);

const toggleFavorite = () => {
    // favoriteState.toggleFavorite(movie);
    // movie.isFavorit = !movie.isFavorit;
    moviesStore.toggleFavorite(movie.id)
    emit('toggle-favorite');
};

const toggleWatchlist = () => {
    // watchlistState.toggleWatchlist(movie);
    // movie.isInWatchlist = watchlistState.isInWatchlist(movie.id);
    moviesStore.toggleWatchlist(movie.id)
    emit('toggle-watchlist');
};

const showListsDialog = () => {

}
</script>

<style scoped>
.relative {
    position: relative;
}

.absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>