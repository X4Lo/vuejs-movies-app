<template>
    <div
        class="relative bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-103 hover:shadow-lg">
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
            </div>

            <p class="text-sm text-white text-center mt-4 mx-3">{{ movie.overview }}</p>
        </div>
    </div>
</template>

<script setup>
import { HeartIcon, BookmarkIcon } from '@heroicons/vue/24/solid';
import { favoriteState } from '../state/favoriteState';

const { movie } = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['toggle-favorite', 'toggle-watchlist']);

const toggleFavorite = () => {
    emit('toggle-favorite');
    favoriteState.toggleFavorite(movie);
    movie.isFavorit = favoriteState.isFavorite(movie.id);
};

const toggleWatchlist = () => {
    emit('toggle-watchlist');
};
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