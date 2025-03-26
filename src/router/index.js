import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Favorit from '../views/Favorit.vue';
import Watchlist from '../views/Watchlist.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorit', name: 'Favorit', component: Favorit },
    { path: '/watchlist', name: 'Watchlist', component: Watchlist },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;