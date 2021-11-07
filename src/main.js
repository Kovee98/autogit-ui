import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes.js';

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './scss/index.scss';
import './scss/fontello/css/fontello.css';
import 'virtual:windi-utilities.css'

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);

app.use(router);

app.mount('#app');
