<template>
    <div class="popover" :style="{ top: `${top}px`, left: `${left}px` }" v-if="visible">
        <h4 class="text-lg font-bold mb-2">Add to Collection</h4>
        <div class="mb-2">
            <input type="text" v-model="searchQuery" @keydown.enter="createNewCollection"
                placeholder="Collection name..." class="w-full px-2 py-1 border border-gray-300 rounded" />
            <button v-if="showCreateButton" @click="createNewCollection"
                class="mt-2 w-full bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors">
                Create "{{ searchQuery }}"
            </button>
        </div>

        <ul class="space-y-2 max-h-48 overflow-y-auto">
            <li v-for="list in filteredLists" :key="list.id" class="flex items-center">
                <input type="checkbox" :id="`list-${list.id}`" :checked="isMovieInList(list.id)"
                    @change="toggleMovieInCollection(list.id)" class="mr-2" />
                <label :for="`list-${list.id}`">{{ list.name }}</label>
            </li>
        </ul>

        <!-- <button class="mt-4 w-full bg-gray-200 px-4 py-2 rounded" @click="close">
            Close
        </button> -->
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMoviesStore } from '../stores/movies';

const props = defineProps({
    collections: {
        type: Array,
        required: true,
    },
    movieId: {
        type: Number,
        required: true,
    },
    top: {
        type: Number,
        required: true,
    },
    left: {
        type: Number,
        required: true,
    },
    visible: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['close']);

const moviesStore = useMoviesStore();

// search
const searchQuery = ref('');
const showCreateButton = computed(() => {
    return (
        searchQuery.value.trim() !== '' &&
        !props.collections.some((c) => c.name.toLowerCase() === searchQuery.value.toLowerCase())
    );
});

const filteredLists = computed(() => {
    if (!searchQuery.value) return props.collections;
    return props.collections.filter((list) =>
        list.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const createNewCollection = () => {
    if (searchQuery.value.trim() === '') return;

    moviesStore.addNewCollection(searchQuery.value.trim());
    searchQuery.value = '';
};

// collections logic
const isMovieInList = (listId) => {
    return moviesStore.isMovieInCollection(props.movieId, listId);
};

const toggleMovieInCollection = (listId) => {
    moviesStore.toggleMovieInCollection(props.movieId, listId);
};

// popover close
const close = () => {
    emit('close');
};

const handleClickOutside = (event) => {
    const popover = document.querySelector('.popover');
    if (popover && !popover.contains(event.target)) {
        close();
    }
    // console.log("out")
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.popover {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 8px;
    pointer-events: auto;
    z-index: 10000;
    width: 250px;
}
</style>