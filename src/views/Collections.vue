<template>
    <div class="p-6 cursor-pointer">
        <div v-if="loading" class="text-center text-gray-500 text-lg">Loading...</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CollectionCard v-for="collection in collections" :key="collection.id" :collection="collection" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '../stores/movies';

const moviesStore = useMoviesStore();

const collections = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        collections.value = moviesStore.collections;
    } catch (error) {
        console.error('Error fetching collections:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped></style>