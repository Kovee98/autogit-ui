import Home from './views/Home.vue';
import Auth from './views/Auth.vue';

export default [
    {
        path: '/',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/auth',
        component: Auth,
        meta: { title: 'Auth' }
    },
    // {
    //     path: '/:path(.*)',
    //     component: NotFound
    // }
];
