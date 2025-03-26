<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <div id="app">
        <NavBar />
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped></style>
