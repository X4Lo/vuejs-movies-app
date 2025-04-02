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

                <button ref="popoverButton"
                    class="text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-200"
                    @click.stop="togglePopover">
                    <PlusIcon class="h-6 w-6" />
                </button>
            </div>

            <p class="text-sm text-white text-center mt-4 mx-3">{{ movie.overview }}</p>
            <Popover v-if="isPopoverVisible" :collections="collections" :movie-id="movie.id" @close="closePopover" />
        </div>
    </div>
</template>

<script setup>
import Popover from './Popover.vue';
import { HeartIcon, BookmarkIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { ref, computed, onMounted, nextTick, createApp } from 'vue';
import { useMoviesStore } from '../stores/movies';

const { movie } = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

const moviesStore = useMoviesStore();
const collections = computed(() => moviesStore.collections);

const emit = defineEmits(['toggle-favorite', 'toggle-watchlist']);

const isPopoverVisible = ref(false);
const popoverPosition = ref({ top: 0, left: 0 });

const popoverButton = ref(null);

const togglePopover = async () => {
    if (isPopoverVisible.value) {
        closePopover();
        return;
    }

    await nextTick(); 
    const buttonRect = popoverButton.value.getBoundingClientRect();
    popoverPosition.value = {
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
    };

    isPopoverVisible.value = true;

    const popoverContainer = document.getElementById('popover-container');
    if (popoverContainer) {
        popoverContainer.innerHTML = '';
        
        const app = createApp(Popover, {
            collections: collections.value,
            movieId: movie.id,
            top: popoverPosition.value.top,
            left: popoverPosition.value.left,
            visible: true,
            onClose: closePopover,
        });
        app.mount(popoverContainer);
    }
};

const closePopover = () => {
    isPopoverVisible.value = false;

    const popoverContainer = document.getElementById('popover-container');
    if (popoverContainer) {
        popoverContainer.innerHTML = '';
    }
};

const toggleFavorite = () => {
    moviesStore.toggleFavorite(movie)
    emit('toggle-favorite');
};

const toggleWatchlist = () => {
    moviesStore.toggleWatchlist(movie)
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