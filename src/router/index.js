import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Favorit from '../views/Favorit.vue';
import Watchlist from '../views/Watchlist.vue';
import Collections from '../views/Collections.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorit', name: 'Favorit', component: Favorit },
    { path: '/watchlist', name: 'Watchlist', component: Watchlist },
    { path: '/collections', name: 'Collection', component: Collections },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;