<template>
    <router-link :to="{ name: 'CollectionDetails', params: { id: collection.id } }">
        <div
            class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-center items-center text-center p-6 transition-transform hover:scale-105">
            <h3 class="text-2xl font-bold text-gray-800">{{ collection.name }}</h3>

            <p class="text-sm text-gray-500 mt-2">{{ collection.movies.length }} items</p>
        </div>
    </router-link>
</template>

<script setup>
const { collection } = defineProps({
    collection: {
        type: Object,
        required: true,
    },
});
</script>