<template>
    <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6 h-full">
        <div v-if="reorderable == true" v-for="(movie, index) in mvs" :key="movie.id" draggable="true"
            @dragstart="onDragStart(index)" @dragover.prevent @drop="onDrop(index)">
            <MovieCard :movie="movie" @toggle-favorite="handleToggleFavorite(movie)"
                @toggle-watchlist="handleToggleWatchlist(movie)" />
        </div>

        <div v-if="!reorderable" v-for="(movie, index) in movies" :key="movie.id">
            <MovieCard :movie="movie" @toggle-favorite="handleToggleFavorite(movie)"
                @toggle-watchlist="handleToggleWatchlist(movie)" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, createApp } from 'vue';
import MovieCard from '../components/MovieCard.vue';

const props = defineProps({
    movies: {
        type: Array,
        required: true,
    },
    reorderable: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['card-change', 'reorder']);

// local copy of movies to allow reordering
const mvs = ref([]);

onMounted(() => {
    mvs.value = [...props.movies];
});

// watch for changes in props.movies and update mvs accordingly
watch(
    () => props.movies,
    (newMovies) => {
        mvs.value = [...newMovies];
    }
);

const draggedIndex = ref(null);

onMounted(async () => {
    mvs.value = [...props.movies]
})

// drag start
const onDragStart = (index) => {
    draggedIndex.value = index;
};

// drag end (drop)
const onDrop = (targetIndex) => {
    if (draggedIndex.value !== null && draggedIndex.value !== targetIndex) {
        const draggedItem = mvs.value[draggedIndex.value];
        mvs.value.splice(draggedIndex.value, 1); // remove draged item
        mvs.value.splice(targetIndex, 0, draggedItem); // insert it in new position

        // console.log(mvs.value.map(m => m.id))
        emit('reorder', mvs.value);
    }
    draggedIndex.value = null;
};

const handleToggleFavorite = (movie) => {
    emit('card-change');
    // console.log('Toggle Favorite:', movie);
};

const handleToggleWatchlist = (movie) => {
    emit('card-change');
    // console.log('Toggle Watchlist:', movie);
};
</script>