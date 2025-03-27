<template>
    <div class="flex items-center justify-center space-x-2 mt-3">
        <!-- previous -->
        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition">
            Previous
        </button>

        <div class="flex space-x-2">
            <!-- first page -->
            <button v-if="showFirstPageButton" @click="changePage(1)" :class="getPageButtonClass(1)">
                1
            </button>

            <!-- ellipsis 1 -->
            <span v-if="showEllipsisBefore" class="text-gray-500">...</span>

            <!-- middle pages -->
            <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
                :class="getPageButtonClass(page)">
                {{ page }}
            </button>

            <!-- ellipsis -->
            <span v-if="showEllipsisAfter" class="text-gray-500">...</span>

            <!-- last page -->
            <button v-if="showLastPageButton" @click="changePage(maxPages)" :class="getPageButtonClass(maxPages)">
                {{ maxPages }}
            </button>
        </div>

        <!-- next -->
        <button :disabled="currentPage === maxPages" @click="changePage(currentPage + 1)"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition">
            Next
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    maxPages: {
        type: Number,
        required: true,
        validator: (value) => value > 0,
    },
});

const emit = defineEmits(['pageChange']);

const currentPage = ref(1);

const MAX_VISIBLE_PAGES = 5;
const visiblePages = computed(() => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);

    if (props.maxPages <= MAX_VISIBLE_PAGES) {
        // show all if less then MAX_VISIBLE_PAGES
        for (let i = 1; i <= props.maxPages; i++) {
            pages.push(i);
        }
    } else if (currentPage.value <= half + 1) {
        // near start
        for (let i = 1; i <= MAX_VISIBLE_PAGES - 1; i++) {
            pages.push(i);
        }
    } else if (currentPage.value >= props.maxPages - half) {
        // near end
        for (let i = props.maxPages - (MAX_VISIBLE_PAGES - 2); i <= props.maxPages; i++) {
            pages.push(i);
        }
    } else {
        // middle
        for (let i = currentPage.value - half; i <= currentPage.value + half; i++) {
            pages.push(i);
        }
    }

    return pages;
});

const showFirstPageButton = computed(() => currentPage.value > Math.floor(MAX_VISIBLE_PAGES / 2) + 1 && props.maxPages > MAX_VISIBLE_PAGES);
const showLastPageButton = computed(() => currentPage.value < props.maxPages - Math.floor(MAX_VISIBLE_PAGES / 2) && props.maxPages > MAX_VISIBLE_PAGES);
const showEllipsisBefore = computed(() => currentPage.value > Math.floor(MAX_VISIBLE_PAGES / 2) + 1 && props.maxPages > MAX_VISIBLE_PAGES);
const showEllipsisAfter = computed(() => currentPage.value < props.maxPages - Math.floor(MAX_VISIBLE_PAGES / 2) && props.maxPages > MAX_VISIBLE_PAGES);

const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= props.maxPages) {
        currentPage.value = newPage;
        emit('pageChange', currentPage.value);
    }
};

const getPageButtonClass = (page) => {
    return [
        'px-4 py-2 rounded transition',
        currentPage.value === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ];
};
</script>

<style scoped></style>