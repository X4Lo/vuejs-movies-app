<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 v-if="collection" class="text-3xl font-bold">{{ collection.name }}</h1>
            <!-- <div class="flex space-x-4 mt-4 md:mt-0">
                <button @click="edit()"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Edit Collection
                </button>
            </div> -->
        </div>

        <MovieList :movies="collectionMovies" :reorderable="true" @reorder="handleReorder" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '../stores/movies';
import MovieList from '../components/MovieList.vue';

const moviesStore = useMoviesStore();
const collection = ref({ name: "" });
const collectionMovies = ref([]);

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    collection.value = moviesStore.getCollectionById(props.id);
    collectionMovies.value = moviesStore.getCollectionMovies(props.id);
});

const handleReorder = (newOrder) => {
    const ids = newOrder.map(m => m.id);
    moviesStore.reorderCollectionMovies(props.id, ids);
};
</script>