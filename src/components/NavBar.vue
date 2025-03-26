<script setup>
</script>

<template>
    <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex-shrink-0">
                    <a href="#" class="text-white text-lg font-bold">MovieApp</a>
                </div>
                <div class="hidden md:block">
                    <ul class="flex space-x-4">
                        <li>
                            <a class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                                <router-link to="/">Home</router-link>
                            </a>
                        </li>
                        <li>
                            <a class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                                <router-link to="/favorit">Favorit</router-link>
                            </a>
                        </li>
                        <li>
                            <a class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                                <router-link to="/watchlist">Watchlist</router-link>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
