<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <div id="app">
        <NavBar />
        <main>
            <router-view></router-view>
            <div id="popover-container"></div>

        </main>
    </div>
</template>

<style>
#popover-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999; /* Ensure it appears above other elements */
  pointer-events: none; /* Allow clicks to pass through unless explicitly handled */
}
</style>