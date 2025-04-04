<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <div id="app">
        <NavBar />
        <main>
            <router-view></router-view>
            <div id="popover-container" class="absolute top-0 left-0 pointer-events-none"></div>
        </main>
    </div>
</template>

<style>
#popover-container {
    z-index: 9999;
}
</style>